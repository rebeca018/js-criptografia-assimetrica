// Não esqueça de executar o seguinte comando para instalar as dependências:
// npm i 
// Comando para executar o código
// node rsa-encryption

const forge = require('node-forge');

const gerarParChaves = () => {
    const chaves = forge.pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
    const chavePublica = forge.pki.publicKeyToPem(chaves.publicKey);
    const chavePrivada = forge.pki.privateKeyToPem(chaves.privateKey);
    return { chavePublica, chavePrivada };
};

const criptografar = (texto, chavePublica) => {
    const chavePub = forge.pki.publicKeyFromPem(chavePublica);
    const criptografar = chavePub.encrypt(texto, 'RSA-OAEP');
    return forge.util.encode64(criptografar);
};


const descriptografar = (textoCript, chavePrivada) => {
    const chavePriv = forge.pki.privateKeyFromPem(chavePrivada);
    const decodificar = forge.util.decode64(textoCript);
    const descriptografada = chavePriv.decrypt(decodificar, 'RSA-OAEP');
    return descriptografada;
};


const { chavePublica, chavePrivada } = gerarParChaves();

console.log('Chave Pública:', chavePublica);
console.log('Chave Privada:', chavePrivada);

const texto = "O código utiliza a biblioteca node-forge para criptografar dados.";
console.log('\nTexto original:', texto);

const textoCriptografado = criptografar(texto, chavePublica);
console.log('\nTexto criptografado:', textoCriptografado);

const textoDescriptografado = descriptografar(textoCriptografado, chavePrivada);
console.log('\nTexto descriptografado:', textoDescriptografado);
