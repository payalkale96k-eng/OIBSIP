const temperatureInput =
    document.getElementById("temperature");

const unitSelect =
    document.getElementById("unit");

const convertButton =
    document.getElementById("convertBtn");

const errorMessage =
    document.getElementById("errorMessage");

const celsiusResult =
    document.getElementById("celsiusResult");

const fahrenheitResult =
    document.getElementById("fahrenheitResult");

const kelvinResult =
    document.getElementById("kelvinResult");


convertButton.addEventListener("click", function () {

    errorMessage.textContent = "";

    const value =
        parseFloat(temperatureInput.value);

    const unit =
        unitSelect.value;


    // Check for empty or invalid input

    if (temperatureInput.value.trim() === "" ||
        isNaN(value)) {

        errorMessage.textContent =
            "⚠️ Please enter a valid temperature.";

        clearResults();

        return;
    }


    let celsius;
    let fahrenheit;
    let kelvin;


    // Convert from Celsius

    if (unit === "celsius") {

        celsius = value;

        fahrenheit =
            (value * 9 / 5) + 32;

        kelvin =
            value + 273.15;

    }


    // Convert from Fahrenheit

    else if (unit === "fahrenheit") {

        fahrenheit = value;

        celsius =
            (value - 32) * 5 / 9;

        kelvin =
            celsius + 273.15;

    }


    // Convert from Kelvin

    else if (unit === "kelvin") {

        kelvin = value;

        celsius =
            value - 273.15;

        fahrenheit =
            (celsius * 9 / 5) + 32;

    }


    // Absolute zero validation

    if (celsius < -273.15) {

        errorMessage.textContent =
            "⚠️ Temperature cannot be below absolute zero.";

        clearResults();

        return;
    }


    // Display results

    celsiusResult.textContent =
        celsius.toFixed(2) + " °C";

    fahrenheitResult.textContent =
        fahrenheit.toFixed(2) + " °F";

    kelvinResult.textContent =
        kelvin.toFixed(2) + " K";

});


function clearResults() {

    celsiusResult.textContent = "--";

    fahrenheitResult.textContent = "--";

    kelvinResult.textContent = "--";
}