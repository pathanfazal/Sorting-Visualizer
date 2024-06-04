const n = 40;
const array = [];
let animationSpeed = 100;
let sortingAlgorithm = bubbleSort;

init();

function init() {
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    showBars();
}

function play() {
    const swaps = sortingAlgorithm([...array]);
    animate(swaps);
}

function animate(swaps) {
    if (swaps.length === 0) {
        showBars();
        return;
    }
    const [i, j] = swaps.shift();
    [array[i], array[j]] = [array[j], array[i]];
    showBars([i, j]);

    setTimeout(function() {
        animate(swaps);
    }, animationSpeed);
}

function bubbleSort(array) {
    const swaps = [];
    do {
        var swapped = false;
        for (let i = 1; i < array.length; i++) {
            if (array[i - 1] > array[i]) {
                swaps.push([i - 1, i]);
                swapped = true;
                [array[i - 1], array[i]] = [array[i], array[i - 1]];
            }
        }
    } while (swapped);
    return swaps;
}

function selectionSort(array) {
    const swaps = [];
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            swaps.push([i, minIndex]);
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
    }
    return swaps;
}

function insertionSort(array) {
    const swaps = [];
    for (let i = 1; i < array.length; i++) {
        let j = i;
        while (j > 0 && array[j - 1] > array[j]) {
            swaps.push([j - 1, j]);
            [array[j - 1], array[j]] = [array[j], array[j - 1]];
            j--;
        }
    }
    return swaps;
}



function quickSort(array) {
    const swaps = [];
    quickSortHelper(array, 0, array.length - 1, swaps);
    return swaps;
}

function quickSortHelper(array, start, end, swaps) {
    if (start >= end) {
        return;
    }

    const pivotIndex = partition(array, start, end, swaps);
    quickSortHelper(array, start, pivotIndex - 1, swaps);
    quickSortHelper(array, pivotIndex + 1, end, swaps);
}

function partition(array, start, end, swaps) {
    const pivot = array[end];
    let i = start - 1;

    for (let j = start; j <= end - 1; j++) {
        if (array[j] < pivot) {
            i++;
            swaps.push([i, j]);
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    swaps.push([i + 1, end]);
    [array[i + 1], array[end]] = [array[end], array[i + 1]];

    return i + 1;
}

function showBars(indices) {
    visualization.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");
        if (indices && indices.includes(i)) {
            bar.classList.add("active");
        }
        visualization.appendChild(bar);
    }
}

function resetVisualization() {
    init();
}

function setAnimationSpeed(value) {
    animationSpeed = value;
}

function changeAlgorithm(algorithm) {
    switch (algorithm) {
        case "bubbleSort":
            sortingAlgorithm = bubbleSort;
            break;
        case "selectionSort":
            sortingAlgorithm = selectionSort;
            break;
        case "insertionSort":
            sortingAlgorithm = insertionSort;
            break;
        case "mergeSort":
            sortingAlgorithm = mergeSort;
            break;
        case "quickSort":
            sortingAlgorithm = quickSort;
            break;
    }
}

function generateRandomArray() {
    const size = prompt("Enter the size of the array (between 10 and 100):");
    if (size && !isNaN(size) && size >= 10 && size <= 100) {
        n = parseInt(size);
        for (let i = 0; i < n; i++) {
            array[i] = Math.random();
        }
        showBars();
    } else {
        alert("Invalid input. Please enter a number between 10 and 100.");
    }
}