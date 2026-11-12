export async function windowHandling(page,action){
    let [popup] = await Promise.all([
        page.waitForEvent('popup'),
        action
    ])
    await popup.waitForLoadState()
    return popup
}