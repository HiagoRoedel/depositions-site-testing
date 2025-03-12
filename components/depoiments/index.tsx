"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { fetchData } from "@/service";
import Video from "../video";

export interface Deposition {
    name: string;
    photo: string;
    course: string;
    city: string;
    type: string;
    modality: string;
    feedback?: string;
    video?: string;
}

export default function NewDepoiments() {
    const [data, setData] = useState<Deposition[]>([]);
    const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchDepositions = async () => {
            try {
                const result = await fetchData();
                if (result?.depositions) {
                    setData(result.depositions);
                }
            } catch (error) {
                console.log("Erro ao buscar depoimentos:", error);
            }
        };

        fetchDepositions();
    }, []);

    const handleFeedbackClick = (feedback: string) => {
        setSelectedFeedback(feedback);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedFeedback(null);
    };

    if (!data.length) return <p className="text-center text-white py-4">Nenhum depoimento encontrado.</p>;

    return (
        <section
            className="bg-[#7500ff] py-12"
            style={{
                backgroundImage: 'url(/bg-depositions.svg)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
            }}
        >
            <div className="container mx-auto px-4">
                <h1 className="fontKrona text-3xl text-center text-white mb-6">
                    Quem faz a escolha certa não se arrepende!
                </h1>
                <div className="slider">
                    <Swiper
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper"
                        spaceBetween={20}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        centeredSlides={true}
                    >
                        {data.map((depo, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className="mt-10 h-[330px] w-[340px] rounded-xl bg-transparent p-4 shadow-sm backdrop-blur-xl xl:w-[420px]"
                                    style={{ background: 'rgba(166, 139, 255, 0.4)' }}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="">
                                            {depo.video ? (
                                                <div className="h-[180px]">
                                                    <Video
                                                        url={depo.video}
                                                        thumbnail={depo.photo}
                                                    />
                                                </div>
                                            ) : (
                                                <Image
                                                    src={depo.photo || depo.video || ''}
                                                    alt={`Foto de ${depo.name}`}
                                                    width={96}
                                                    height={96}
                                                    className="rounded-sm w-28 h-28 object-cover mb-4"
                                                />
                                            )}
                                        </div>

                                        <h3 className="text-lg font-semibold">{depo.name}</h3>
                                        <p className="text-black">{depo.course} - {depo.city}</p>
                                        {depo.feedback && (
                                            <p
                                                className="mt-2 text-black cursor-pointer"
                                                onClick={() => handleFeedbackClick(depo.feedback)}
                                            >
                                                {depo.feedback.length > 100
                                                    ? depo.feedback.substring(0, 100) + "...Saiba mais" // Limite inicial
                                                    : depo.feedback
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>


            {modalOpen && selectedFeedback && (
                <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-3xl bg-opacity-50 z-50">
                    <div className="bg-blue-950 p-6 rounded-xl max-w-lg w-full">
                        <p className="tex-black">{selectedFeedback}</p>
                        <button
                            onClick={closeModal}
                            className="mt-4 bg-[#7500ff] text-white py-2 px-4 rounded-md"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
