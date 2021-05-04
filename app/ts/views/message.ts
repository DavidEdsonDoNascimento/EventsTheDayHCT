const showMessage = (status:string, msg: string) => {
    
    let messageElement = $('.message')
    
    messageElement.addClass(`alert alert-${status}`)
    messageElement.text(msg)
    messageElement.fadeIn()
    
    setTimeout(()=>{
        messageElement.fadeOut()
    }, 4000)
}