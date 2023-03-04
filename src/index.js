const { app, BrowserWindow, Tray } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.

  
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    
    icon: path.join(__dirname, "./icons8-inseto-48.png"),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js',),

    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
function adicionarLinha() {
  // Obter os dados da entrada do usuário
  const data = document.getElementById("data").value;
  const entrada = document.getElementById("entrada").value;
  const saida = document.getElementById("saida").value;

  // Calcular as horas trabalhadas e horas extras
  const diff = (new Date(`1970-01-01 ${saida}`) - new Date(`1970-01-01 ${entrada}`)) / 1000 / 60 / 60; // Horas trabalhadas
  const horasTrabalhadas = Math.min(8, diff); // Máximo de 8 horas por dia
  const horasExtras = Math.max(0, diff - 8); // Horas extras

  // Criar uma nova linha na tabela
  const tabela = document.getElementById("tabela");
  const novaLinha = tabela.insertRow(-1);
  const novaCelulaData = novaLinha.insertCell(0);
  const novaCelulaEntrada = novaLinha.insertCell(1);
  const novaCelulaSaida = novaLinha.insertCell(2);
  const novaCelulaHorasTrabalhadas = novaLinha.insertCell(3);
  const novaCelulaHorasExtras = novaLinha.insertCell(4);

  // Preencher a nova linha com os dados
  novaCelulaData.innerHTML = data;
  novaCelulaEntrada.innerHTML = entrada;
  novaCelulaSaida.innerHTML = saida;
  novaCelulaHorasTrabalhadas.innerHTML = horasTrabalhadas;
  novaCelulaHorasExtras.innerHTML = horasExtras;}