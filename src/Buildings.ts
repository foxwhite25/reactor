export const GetBuyBuildingFunction = (row: number, col: number) : (e: Event) => void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (e: Event) => {
        alert(`You clicked on ${row}, ${col}`)
    }
}
