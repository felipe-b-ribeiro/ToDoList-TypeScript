"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.setItem = exports.getAllToDos = exports.render = exports.showModal = exports.handleSubmit = void 0;
var handleSubmit = function (e) {
    e.preventDefault();
    var form = e === null || e === void 0 ? void 0 : e.target;
    var data = new FormData(form);
    var titulo = data.get("titulo");
    var descricao = data.get("descricao");
    if (!titulo || !descricao) {
        return alert("Ambos os campos devem ser preenchidos!");
    }
    var resposta = (0, exports.setItem)(titulo, descricao);
    if (resposta) {
        alert("Tarefa cadastrada com sucesso!");
        window.location.href = "minhastarefas.html";
        return;
    }
    else {
        alert("Erro ao cadastrar tarefa!");
        window.location.reload();
        return;
    }
};
exports.handleSubmit = handleSubmit;
var showModal = function (chave) { return __awaiter(void 0, void 0, void 0, function () {
    var isDelete;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                isDelete = confirm("Deseja excluir essa tarefa mesmo? Essa ação é permanente!");
                if (!isDelete) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, exports.deleteItem)(chave)];
            case 1:
                _a.sent();
                window.location.reload();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
exports.showModal = showModal;
var render = function (toDos, title) {
    var container = document.getElementById("main-container");
    if (toDos.length === 0) {
        container.innerHTML = "\n              <h3>".concat(title, "</h3>\n              <p>Parece que voc\u00EA n\u00E3o tem nenhuma tarefa ").concat(title === "Minhas Tarefas" ? "cadastrada" : title === "Tarefas Pendentes" ? "pendente" : "concluída", "...</p>\n              <button><a href=\"").concat(title === "Minhas tarefas" ? "cadastrartarefa.html" : "minhastarefas.html", "\">").concat(title === "Tarefas Concluídas" ? "Concluir alguma" : "Cadastrar Agora!", "</a></button>\n            ");
    }
    else {
        container.innerHTML = "\n              <h3>".concat(title, "</h3>\n              <div id=\"task-card-list\"></div>\n            ");
        var list_1 = document.getElementById("task-card-list");
        toDos.forEach(function (toDo) {
            var card = document.createElement("div");
            card.classList.add("task-card");
            card.innerHTML = "\n                <div class='titulo-wrapper'>\n                  <label class='finished-btn'>\n                    <input class='checkbox' type='checkbox' ".concat(toDo.valor.concluido ? "checked" : "", "/>\n                    <span class='checkbox-text'></span>\n                  </label>\n                  <h4>").concat(toDo.titulo, "</h4>\n                </div>\n                <p>").concat(toDo.valor.descricao, "</p>\n                <div class='btn-wrapper'>\n                  <button class='delete-btn'>\n                    <svg width='30' height='30' viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"> <path d=\"M3 6.38597C3 5.90152 3.34538 5.50879 3.77143 5.50879L6.43567 5.50832C6.96502 5.49306 7.43202 5.11033 7.61214 4.54412C7.61688 4.52923 7.62232 4.51087 7.64185 4.44424L7.75665 4.05256C7.8269 3.81241 7.8881 3.60318 7.97375 3.41617C8.31209 2.67736 8.93808 2.16432 9.66147 2.03297C9.84457 1.99972 10.0385 1.99986 10.2611 2.00002H13.7391C13.9617 1.99986 14.1556 1.99972 14.3387 2.03297C15.0621 2.16432 15.6881 2.67736 16.0264 3.41617C16.1121 3.60318 16.1733 3.81241 16.2435 4.05256L16.3583 4.44424C16.3778 4.51087 16.3833 4.52923 16.388 4.54412C16.5682 5.11033 17.1278 5.49353 17.6571 5.50879H20.2286C20.6546 5.50879 21 5.90152 21 6.38597C21 6.87043 20.6546 7.26316 20.2286 7.26316H3.77143C3.34538 7.26316 3 6.87043 3 6.38597Z\" fill=\"#ffffff\"></path> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.5956 22.0001H12.4044C15.1871 22.0001 16.5785 22.0001 17.4831 21.1142C18.3878 20.2283 18.4803 18.7751 18.6654 15.8686L18.9321 11.6807C19.0326 10.1037 19.0828 9.31524 18.6289 8.81558C18.1751 8.31592 17.4087 8.31592 15.876 8.31592H8.12404C6.59127 8.31592 5.82488 8.31592 5.37105 8.81558C4.91722 9.31524 4.96744 10.1037 5.06788 11.6807L5.33459 15.8686C5.5197 18.7751 5.61225 20.2283 6.51689 21.1142C7.42153 22.0001 8.81289 22.0001 11.5956 22.0001ZM10.2463 12.1886C10.2051 11.7548 9.83753 11.4382 9.42537 11.4816C9.01321 11.525 8.71251 11.9119 8.75372 12.3457L9.25372 17.6089C9.29494 18.0427 9.66247 18.3593 10.0746 18.3159C10.4868 18.2725 10.7875 17.8856 10.7463 17.4518L10.2463 12.1886ZM14.5746 11.4816C14.9868 11.525 15.2875 11.9119 15.2463 12.3457L14.7463 17.6089C14.7051 18.0427 14.3375 18.3593 13.9254 18.3159C13.5132 18.2725 13.2125 17.8856 13.2537 17.4518L13.7537 12.1886C13.7949 11.7548 14.1625 11.4382 14.5746 11.4816Z\" fill=\"#ffffff\"></path> </g></svg>\n                  </button>\n                  <button class='edit-btn'>\n                    <svg width='30' height='30' viewBox=\"-4.62 -4.62 30.24 30.24\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" fill=\"#ffffff\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"> <title>edit [#1479]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"> <g id=\"Dribbble-Light-Preview\" transform=\"translate(-99.000000, -400.000000)\" fill=\"#fff\"> <g id=\"icons\" transform=\"translate(56.000000, 160.000000)\"> <path d=\"M61.9,258.010643 L45.1,258.010643 L45.1,242.095788 L53.5,242.095788 L53.5,240.106431 L43,240.106431 L43,260 L64,260 L64,250.053215 L61.9,250.053215 L61.9,258.010643 Z M49.3,249.949769 L59.63095,240 L64,244.114985 L53.3341,254.031929 L49.3,254.031929 L49.3,249.949769 Z\" id=\"edit-[#1479]\"> </path> </g> </g> </g> </g></svg>\n                  </button>\n                </div>\n              ");
            var checkbox = card.querySelector(".checkbox");
            var span = card.querySelector(".checkbox-text");
            var deleteBtn = card.querySelector(".delete-btn");
            var titulo = card.querySelector("h4");
            var finishedBtn = card.querySelector(".finished-btn");
            function atualizarTexto() {
                span.innerHTML = checkbox.checked
                    ? "<svg width='25' height='25' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <path d='M4 12.6111L8.92308 17.5L20 6.5' stroke='#ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> </g></svg>"
                    : "<svg width='25' height='25' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <path d='M4 12.6111L8.92308 17.5L20 6.5' stroke='#008000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> </g></svg>";
            }
            deleteBtn.addEventListener("click", function () { (0, exports.showModal)(titulo.textContent); });
            var timer;
            finishedBtn.addEventListener("click", function () {
                clearTimeout(timer);
                timer = setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var tarefaBruta, tarefaLimpa;
                    return __generator(this, function (_a) {
                        tarefaBruta = localStorage.getItem(titulo.textContent);
                        if (!tarefaBruta)
                            return [2 /*return*/];
                        tarefaLimpa = JSON.parse(tarefaBruta);
                        localStorage.setItem(titulo.textContent, JSON.stringify(__assign(__assign({}, tarefaLimpa), { "concluido": !tarefaLimpa.concluido })));
                        if (title === "Tarefas Concluídas") {
                            window.location.reload();
                        }
                        return [2 /*return*/];
                    });
                }); }, 500);
            });
            checkbox.addEventListener("change", atualizarTexto);
            atualizarTexto();
            list_1.appendChild(card);
        });
        var createTaskCard = document.createElement("div");
        createTaskCard.classList.add("create-task-card");
        createTaskCard.addEventListener("click", function () {
            window.location.href = 'cadastrartarefa.html';
        });
        createTaskCard.innerHTML = "    \n              <svg width='70' height='70' viewBox=\"0 0 32 32\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\" fill=\"#00ff00\" stroke=\"#00ff00\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"> <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\"> <g id=\"Icon-Set-Filled\" sketch:type=\"MSLayerGroup\" transform=\"translate(-362.000000, -1037.000000)\" fill=\"#00ff00\"> <path d=\"M390,1049 L382,1049 L382,1041 C382,1038.79 380.209,1037 378,1037 C375.791,1037 374,1038.79 374,1041 L374,1049 L366,1049 C363.791,1049 362,1050.79 362,1053 C362,1055.21 363.791,1057 366,1057 L374,1057 L374,1065 C374,1067.21 375.791,1069 378,1069 C380.209,1069 382,1067.21 382,1065 L382,1057 L390,1057 C392.209,1057 394,1055.21 394,1053 C394,1050.79 392.209,1049 390,1049\" id=\"plus\" sketch:type=\"MSShapeGroup\"> </path> </g> </g> </g></svg>\n            ";
        list_1.appendChild(createTaskCard);
    }
};
exports.render = render;
var getAllToDos = function (excecao) {
    var itens = [];
    for (var i = 0; i < localStorage.length; i++) {
        var chave = localStorage.key(i);
        if (!chave)
            continue;
        var valor = localStorage.getItem(chave);
        if (!valor)
            continue;
        var valorParse = JSON.parse(valor);
        if (!("concluido" in valorParse))
            continue;
        if (excecao === 'concluidos') {
            if (!valorParse.concluido)
                continue;
        }
        else if (excecao === 'pendentes') {
            if (valorParse.concluido)
                continue;
        }
        itens.push({ titulo: chave, valor: valorParse });
    }
    return itens;
};
exports.getAllToDos = getAllToDos;
var setItem = function (titulo, descricao) {
    try {
        localStorage.setItem(titulo, JSON.stringify({ descricao: descricao, concluido: false }));
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
};
exports.setItem = setItem;
var deleteItem = function (chave) {
    try {
        localStorage.removeItem(chave);
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
};
exports.deleteItem = deleteItem;
