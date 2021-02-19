function GenerateQRCode (_hash) {
//TODO : Récupérer le hash dans le contexte courant
    const hash = "http://localhost:3000/verification-id?" + _hash
    const link = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="
    const result = link + hash

    return result
}
export default GenerateQRCode;