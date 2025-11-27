import '@/styles/_main.scss';

function Main() {
    return (
        <main>
            <div>
                <h1>Conversor de Temperatura</h1>
                <form action="">
                    <label htmlFor="valor">Digite a temperatura:</label>
                    <input type="number" name="valor" id="" />
                    <label htmlFor="de">de:</label>
                    <select name="de" id="">
                        <option value="celsius">Celsius</option>
                        <option value="fahrenheit">Fahrenheit</option>
                        <option value="kelvin">Kelvin</option>
                    </select>
                    <label htmlFor="para">para:</label>
                    <select name="para" id="">
                        <option value="celsius">Celsius</option>
                        <option value="fahrenheit">Fahrenheit</option>
                        <option value="kelvin">Kelvin</option>
                    </select>
                    <button type="submit">Converter</button>
                </form>
            </div>
        </main>
    );
}

export default Main;