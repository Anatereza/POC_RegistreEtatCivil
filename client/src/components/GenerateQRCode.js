function GenerateQRCode () {
//TODO : Récupérer le hash dans le contexte courant
    const hash = "TODO : insérer hash contexte courant"
    const link = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="
    const result = link + hash

    return result
}
export default GenerateQRCode;