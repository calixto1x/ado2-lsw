// ==========================================
// SCRIPT DE AUTOAVALIAÇÃO
// ==========================================

window.addEventListener('load', () => {
    // Cria o painel flutuante de testes na tela
    const painelNota = document.createElement('div');
    painelNota.style.cssText = 'position: fixed; bottom: 10px; right: 10px; background: #1e293b; color: #fff; padding: 15px; border-radius: 8px; font-family: sans-serif; z-index: 9999; max-width: 320px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);';
    
    painelNota.innerHTML = `
        <h3 style="margin:0 0 8px 0; font-size:16px; color:#60a5fa;">Validador do Laboratório</h3>
        <p style="margin:0 0 10px 0; font-size:12px; color:#cbd5e1;">Clique no botão abaixo para rodar a avaliação automática:</p>
        <button id="btn-rodar-teste" style="width:100%; padding:8px; background:#2563eb; color:white; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">Avaliar Meu Código</button>
        <div id="resultado-teste" style="margin-top:10px; font-size:12px;"></div>
    `;
    document.body.appendChild(painelNota);

    // Quando o aluno clicar no botão de avaliar
    document.getElementById('btn-rodar-teste').addEventListener('click', () => {
        let notaTotal = 0;
        const relatorio = [];

        function registrarTeste(fase, peso, passou, mensagem) {
            if (passou) {
                notaTotal += peso;
                relatorio.push(`<span style="color:#4ade80;">[✔] ${fase} (+${peso}):</span> ${mensagem}`);
            } else {
                registrarTesteAux(fase, peso, mensagem); // auxiliar para formatação de erro
            }
        }

        function registrarTesteAux(fase, peso, mensagem) {
            relatorio.push(`<span style="color:#f87171;">[✖] ${fase} (0):</span> ${mensagem}`);
        }

        // 1. Teste Fase 1: Variáveis e Título
        const titulo = document.getElementById('titulo-banco');
        if (titulo && titulo.textContent.includes('Banco SENAC')) {
            registrarTeste('Fase 1 (DOM)', 1.5, true, 'Título alterado corretamente.');
        } else {
            registrarTesteAux('Fase 1 (DOM)', 1.5, 'Título não foi alterado para "Banco SENAC - Acesso".');
        }

        // 2. Teste Fase 2: Foco e Blur
        const inputConta = document.getElementById('input-conta');
        const inputSenha = document.getElementById('input-senha');
        if (inputConta && inputSenha) {
            inputConta.focus();
            const passouFocus = inputConta.classList.contains('borda-destaque');
            inputConta.blur();
            if (passouFocus) {
                registrarTeste('Fase 2 (Focus/Blur)', 2.0, true, 'Eventos de foco funcionais.');
            } else {
                registrarTesteAux('Fase 2 (Focus/Blur)', 2.0, 'Classe de destaque não aplicada no focus.');
            }
        } else {
            registrarTesteAux('Fase 2 (Focus/Blur)', 2.0, 'Inputs não encontrados.');
        }

        // 3. Teste Fase 3: Mouseenter e Mouseleave
        const container = document.getElementById('container');
        if (container) {
            container.dispatchEvent(new MouseEvent('mouseenter'));
            const passouMouse = container.classList.contains('mouse-no-container');
            container.dispatchEvent(new MouseEvent('mouseleave'));
            
            if (passouMouse) {
                registrarTeste('Fase 3 (Mouse)', 1.5, true, 'Eventos de mouse implementados.');
            } else {
                registrarTesteAux('Fase 3 (Mouse)', 1.5, 'Classe mouse-no-container não ativada.');
            }
        } else {
            registrarTesteAux('Fase 3 (Mouse)', 1.5, 'Container principal não encontrado.');
        }

        // 4. Teste Fase 4: Validação por Teclado (Keyup)
        const btnEntrar = document.getElementById('btn-entrar');
        if (inputConta && inputSenha && btnEntrar) {
            inputConta.value = '';
            inputSenha.value = '123';
            inputSenha.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
            const escondidoComErro = btnEntrar.classList.contains('escondido');

            inputConta.value = '1001';
            inputSenha.value = '12345';
            inputSenha.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
            const visivelComSucesso = !btnEntrar.classList.contains('escondido');

            if (escondidoComErro && visivelComSucesso) {
                registrarTeste('Fase 4 (Validação)', 3.5, true, 'Regra de exibição do botão validada.');
            } else {
                registrarTesteAux('Fase 4 (Validação)', 3.5, 'A lógica de exibir/esconder o botão falhou.');
            }
        } else {
            registrarTesteAux('Fase 4 (Validação)', 3.5, 'Elementos de validação ausentes.');
        }

        // 5. Teste Fase 5: Ação do Botão (Click real verificado por interceptação de Alert)
        let alertFoiChamado = false;
        const alertOriginal = window.alert;
        
        // Intercepta temporariamente o alert para não abrir janelas travando a tela do aluno
        window.alert = () => {
            alertFoiChamado = true;
        };

        try {
            if (btnEntrar && !btnEntrar.classList.contains('escondido')) {
                // Simula o clique via código
                btnEntrar.click();
            }
        } catch (e) {
            console.error(e);
        }

        // Restaura o alert original do navegador
        window.alert = alertOriginal;

        if (alertFoiChamado) {
            registrarTeste('Fase 5 (Click)', 1.5, true, 'Evento de clique programado corretamente (alert disparado).');
        } else {
            registrarTesteAux('Fase 5 (Click)', 1.5, 'O botão não disparou nenhuma ação de clique/alert.');
        }

        // Exibe o relatório final no painel
        const divResultado = document.getElementById('resultado-teste');
        divResultado.innerHTML = `
            <div style="margin-top:8px; padding-top:8px; border-top:1px solid #475569;">
                <strong style="font-size:14px; color: ${notaTotal >= 8 ? '#4ade80' : '#f87171'}">Nota Final: ${notaTotal.toFixed(1)} / 10.0</strong>
                <ul style="padding-left: 15px; margin: 5px 0 0 0; font-size: 11px; line-height: 1.4;"><li>` + relatorio.join('</li><li>') + `</li></ul>
            </div>
        `;
    });
});