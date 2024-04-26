export const sendPushTo = (pushTokens: string[], imageUrl: string) => {
    const request = {
        tokens: pushTokens,
        image_url: imageUrl
    }
    fetch("https://api-epyqvdi7ma-uc.a.run.app/push", {
        method: "POST",
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        mode: 'no-cors',
        body: JSON.stringify(request)
    })
}