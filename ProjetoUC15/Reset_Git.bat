@echo off
title Reset Git History - Modo Diferente
color 0A

echo ========================================================
echo   SCRIPT DE RESET DE HISTORICO GIT (BRANCH ORFA)
echo   Cuidado: Isso apaga todo o historico de commits anterior!
echo ========================================================
echo.

:: 1. Verifica se esta na pasta certa
if not exist .git (
    echo [ERRO] Pasta .git nao encontrada!
    echo Por favor, rode este script na raiz do projeto.
    pause
    exit /b
)

:: 2. Pergunta pela nova URL (Opcional)
echo Caso voce ainda nao tenha mudado o 'origin' para o SEU repositorio:
set /p new_url="Cole a URL do SEU novo repositorio (ou aperte Enter para manter a atual): "

echo.
echo [1/6] Criando branch orfa temporaria...
git checkout --orphan temp_reset_history

echo.
echo [2/6] Adicionando arquivos e criando o Initial Commit...
git add -A
git commit -m "Initial commit"

echo.
echo [3/6] Deletando branches antigas (main ou master)...
:: Tenta deletar main e master, silenciando erros caso uma nao exista
git branch -D main >nul 2>&1
git branch -D master >nul 2>&1

echo.
echo [4/6] Definindo a nova branch principal como 'main'...
git branch -m main

:: 5. Atualiza a URL remota se o usuario digitou algo
if not "%new_url%"=="" (
    echo.
    echo [5/6] Atualizando o link do repositorio remoto...
    git remote set-url origin %new_url%
) else (
    echo.
    echo [5/6] Mantendo a URL remota atual...
)

echo.
echo [6/6] Forcando o envio para o GitHub...
echo (Se pedir senha/token, digite agora)
git push -f origin main

echo.
echo ==========================================
echo   HISTORICO RESETADO COM SUCESSO!
echo ==========================================
pause