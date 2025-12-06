
export const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const form = e?.target as HTMLFormElement;
    const data = new FormData(form);
    const titulo = data.get("titulo") as string;
    const descricao = data.get("descricao") as string;

    if (!titulo || !descricao) {
        return alert('Ambos os campos devem ser preenchidos!');
    }

    const resposta = setItem(titulo, descricao);

    if (resposta) {
        return alert('Tarefa cadastrada com sucesso!');
        location.reload();
    } else {
        return alert('Erro ao cadastrar tarefa!');
    }
}

export const getAllItems = () => {
    const itens = [];
    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        if (!chave) continue;

        const valor = localStorage.getItem(chave);
        itens.push({chave, valor});
    }
    return itens;
}

export const setItem = (chave: string, valor: string) => {
    try {
        localStorage.setItem(chave, valor);
        return true;
    } catch (err: any) {
        console.error(err);
        return false;
    }

}
