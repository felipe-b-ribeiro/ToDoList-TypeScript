export const handleSubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const form = e?.target as HTMLFormElement;
  const data = new FormData(form);
  const titulo = data.get("titulo") as string;
  const descricao = data.get("descricao") as string;

  if (!titulo || !descricao) {
    return alert("Ambos os campos devem ser preenchidos!");
  }

  const resposta = setItem(titulo, descricao);

  if (resposta) {
    alert("Tarefa cadastrada com sucesso!");
    window.location.href = "minhastarefas.html";
    return;
  } else {
    alert("Erro ao cadastrar tarefa!");
    window.location.reload();
    return;
  }
};

export const showModal = async (chave: string) => {
  const isDelete = confirm(
    "Deseja excluir essa tarefa mesmo? Essa ação é permanente!"
  );
  if (isDelete) {
    await deleteItem(chave);
    window.location.reload();
  }
};

type ToDos = {
  titulo: string;
  valor: {
    descricao: string;
    concluido: boolean;
  };
};

type Tarefa = {
  descricao: string,
  concluido: boolean
}

export const render = (toDos: ToDos[], title: string): void => {
  const container = document.getElementById("main-container") as HTMLDivElement;

  if (toDos.length === 0) {
    container.innerHTML = `
              <h3>${title}</h3>
              <p>Parece que você não tem nenhuma tarefa ${title === "Minhas Tarefas" ? "cadastrada" : title === "Tarefas Pendentes" ? "pendente" : "concluída"}...</p>
              <button><a href="${title === "Minhas tarefas" ? "cadastrartarefa.html" : "minhastarefas.html"}">${ title === "Tarefas Concluídas" ?  "Concluir alguma" : "Cadastrar Agora!"}</a></button>
            `;
  } else {
    container.innerHTML = `
              <h3>${title}</h3>
              <div id="task-card-list"></div>
            `;

    const list = document.getElementById("task-card-list") as HTMLDivElement;

    toDos.forEach((toDo) => {
      const card = document.createElement("div");
      card.classList.add("task-card");

      card.innerHTML = `
                <div class='titulo-wrapper'>
                  <label class='finished-btn'>
                    <input class='checkbox' type='checkbox' ${
                      toDo.valor.concluido ? "checked" : ""
                    }/>
                    <span class='checkbox-text'></span>
                  </label>
                  <h4>${toDo.titulo}</h4>
                </div>
                <p>${toDo.valor.descricao}</p>
                <div class='btn-wrapper'>
                  <button class='delete-btn'>
                    <svg width='30' height='30' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 6.38597C3 5.90152 3.34538 5.50879 3.77143 5.50879L6.43567 5.50832C6.96502 5.49306 7.43202 5.11033 7.61214 4.54412C7.61688 4.52923 7.62232 4.51087 7.64185 4.44424L7.75665 4.05256C7.8269 3.81241 7.8881 3.60318 7.97375 3.41617C8.31209 2.67736 8.93808 2.16432 9.66147 2.03297C9.84457 1.99972 10.0385 1.99986 10.2611 2.00002H13.7391C13.9617 1.99986 14.1556 1.99972 14.3387 2.03297C15.0621 2.16432 15.6881 2.67736 16.0264 3.41617C16.1121 3.60318 16.1733 3.81241 16.2435 4.05256L16.3583 4.44424C16.3778 4.51087 16.3833 4.52923 16.388 4.54412C16.5682 5.11033 17.1278 5.49353 17.6571 5.50879H20.2286C20.6546 5.50879 21 5.90152 21 6.38597C21 6.87043 20.6546 7.26316 20.2286 7.26316H3.77143C3.34538 7.26316 3 6.87043 3 6.38597Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5956 22.0001H12.4044C15.1871 22.0001 16.5785 22.0001 17.4831 21.1142C18.3878 20.2283 18.4803 18.7751 18.6654 15.8686L18.9321 11.6807C19.0326 10.1037 19.0828 9.31524 18.6289 8.81558C18.1751 8.31592 17.4087 8.31592 15.876 8.31592H8.12404C6.59127 8.31592 5.82488 8.31592 5.37105 8.81558C4.91722 9.31524 4.96744 10.1037 5.06788 11.6807L5.33459 15.8686C5.5197 18.7751 5.61225 20.2283 6.51689 21.1142C7.42153 22.0001 8.81289 22.0001 11.5956 22.0001ZM10.2463 12.1886C10.2051 11.7548 9.83753 11.4382 9.42537 11.4816C9.01321 11.525 8.71251 11.9119 8.75372 12.3457L9.25372 17.6089C9.29494 18.0427 9.66247 18.3593 10.0746 18.3159C10.4868 18.2725 10.7875 17.8856 10.7463 17.4518L10.2463 12.1886ZM14.5746 11.4816C14.9868 11.525 15.2875 11.9119 15.2463 12.3457L14.7463 17.6089C14.7051 18.0427 14.3375 18.3593 13.9254 18.3159C13.5132 18.2725 13.2125 17.8856 13.2537 17.4518L13.7537 12.1886C13.7949 11.7548 14.1625 11.4382 14.5746 11.4816Z" fill="#ffffff"></path> </g></svg>
                  </button>
                  <button class='edit-btn'>
                    <svg width='30' height='30' viewBox="-4.62 -4.62 30.24 30.24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>edit [#1479]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-99.000000, -400.000000)" fill="#fff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M61.9,258.010643 L45.1,258.010643 L45.1,242.095788 L53.5,242.095788 L53.5,240.106431 L43,240.106431 L43,260 L64,260 L64,250.053215 L61.9,250.053215 L61.9,258.010643 Z M49.3,249.949769 L59.63095,240 L64,244.114985 L53.3341,254.031929 L49.3,254.031929 L49.3,249.949769 Z" id="edit-[#1479]"> </path> </g> </g> </g> </g></svg>
                  </button>
                </div>
              `;

      const checkbox = card.querySelector(`.checkbox`) as HTMLInputElement;
      const span = card.querySelector(`.checkbox-text`) as HTMLSpanElement;
      const deleteBtn = card.querySelector(`.delete-btn`) as HTMLButtonElement;
      const titulo = card.querySelector("h4") as HTMLHeadingElement;
      const finishedBtn = card.querySelector(".finished-btn") as HTMLLabelElement;

      function atualizarTexto() {
        span.innerHTML = checkbox.checked
          ? "<svg width='25' height='25' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <path d='M4 12.6111L8.92308 17.5L20 6.5' stroke='#ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> </g></svg>"
          : "<svg width='25' height='25' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <path d='M4 12.6111L8.92308 17.5L20 6.5' stroke='#008000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> </g></svg>";
      }

      deleteBtn.addEventListener("click", () => {showModal(titulo.textContent)});
      let timer: ReturnType<typeof setTimeout>;
      finishedBtn.addEventListener("click", () => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
        const tarefaBruta = localStorage.getItem(titulo.textContent);
        if (!tarefaBruta) return;
        const tarefaLimpa: Tarefa = JSON.parse(tarefaBruta);
        localStorage.setItem(titulo.textContent, JSON.stringify({...tarefaLimpa, "concluido": !tarefaLimpa.concluido}));
        if (title === "Tarefas Concluídas") { window.location.reload(); }
        }, 500)
      })
      checkbox.addEventListener("change", atualizarTexto);
      atualizarTexto();

      list.appendChild(card);
    });

    const createTaskCard = document.createElement("div");
    createTaskCard.classList.add("create-task-card");
    createTaskCard.addEventListener("click", () => {
      window.location.href = 'cadastrartarefa.html';
    })
    createTaskCard.innerHTML = `    
              <svg width='70' height='70' viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#00ff00" stroke="#00ff00"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-362.000000, -1037.000000)" fill="#00ff00"> <path d="M390,1049 L382,1049 L382,1041 C382,1038.79 380.209,1037 378,1037 C375.791,1037 374,1038.79 374,1041 L374,1049 L366,1049 C363.791,1049 362,1050.79 362,1053 C362,1055.21 363.791,1057 366,1057 L374,1057 L374,1065 C374,1067.21 375.791,1069 378,1069 C380.209,1069 382,1067.21 382,1065 L382,1057 L390,1057 C392.209,1057 394,1055.21 394,1053 C394,1050.79 392.209,1049 390,1049" id="plus" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
            `;
    list.appendChild(createTaskCard);
  }
};

export const getAllToDos = (excecao: string) => {
  const itens = [];
  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i) as string;
    if (!chave) continue;

    const valor = localStorage.getItem(chave);
    if (!valor) continue;

    const valorParse = JSON.parse(valor);
    if (!("concluido" in valorParse)) continue;

    if (excecao === 'concluidos') {
      if (!valorParse.concluido) continue;
    } else if (excecao === 'pendentes') {
      if (valorParse.concluido) continue;
    }

    itens.push({ titulo: chave, valor: valorParse });
  }
  return itens;
};

export const setItem = (titulo: string, descricao: string) => {
  try {
    localStorage.setItem(
      titulo,
      JSON.stringify({ descricao, concluido: false })
    );
    return true;
  } catch (err: any) {
    console.error(err);
    return false;
  }
};

export const deleteItem = (chave: string) => {
  try {
    localStorage.removeItem(chave);
    return true;
  } catch (err: any) {
    console.error(err);
    return false;
  }
};
