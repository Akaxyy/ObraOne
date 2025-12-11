export default async function Project() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return (
        <main>Projeto</main>
    )
}