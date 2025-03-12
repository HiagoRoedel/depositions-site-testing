

export async function fetchData() {
    try {
      const response = await fetch(`https://www.faculdadeunica.com.br/api/depositions?type=geral&modality=pos-graduacao`);

      if (!response.ok) {
        throw new Error("Erro ao buscar os dados");
      }
      const result = await response.json();
      console.log(result)
      return result
    } catch (error) {
      console.log('error', error)
    }
  }