'use client';
import React from 'react';
import Modal from '@/components/Modals';
import Image from 'next/image';

type VideoProps = {
  url: string;
  thumbnail?: string;
  children?: React.ReactNode;
};

const ALLOW_VIDEO = ['vimeo.com', 'youtube.com/embed', '.mp4'];

export default function Video({
  url,
  thumbnail,
  children,
}: Readonly<VideoProps>) {
  let formatUrl = url;

  const isYoutubeVideo = url.includes('youtube.com');

  if (isYoutubeVideo) {
    const [, embedId] = url.split('v=');

    formatUrl = `https://www.youtube.com/embed/${embedId}`;
  }

  if (!ALLOW_VIDEO.some((allowedUrl) => formatUrl.includes(allowedUrl)))
    return <div>Video {url} não permitido</div>;

  return (
    <Modal
      buttonLabel={thumbnail ? <ThumbnailVideo src={thumbnail} /> : children}
    >
      <div className="embed-container">
        <iframe src={formatUrl}></iframe>
      </div>
    </Modal>
  );
}

export function ThumbnailVideo({ src }: { src: string }) {
  return (
    <div className="col-12 relative flex items-center justify-center">
      <Image
        className="thumbnail rounded-2xl"
        src={src}
        width={582}
        height={329.52}
        alt="Imagem de quem fez o depoimento"
      />
      <Image
        className="pulse-button absolute"
        src="/play.svg"
        width={32}
        height={32}
        alt="Play do video educacional faculdade unica."
      />
    </div>
  );
}
