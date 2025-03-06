export function handlerFilterChange(){
    const selectFilter = document.getElementById('select-filter') as HTMLSelectElement;

    selectFilter.addEventListener('change', (e) => {
        const selectValue = selectFilter.value;
        const roverDropdown = document.getElementById('rover-dropdown') as HTMLSelectElement;
        const cameraDropdown = document.getElementById('camera-dropdown') as HTMLSelectElement;

        if(selectValue === 'Camera'){
            roverDropdown.classList.add('hidden');
            cameraDropdown.classList.remove('hidden');
        }else if(selectValue === 'Rover'){
            cameraDropdown.classList.add('hidden');
            roverDropdown.classList.remove('hidden');
        }
        else{
            cameraDropdown.classList.add('hidden');
            roverDropdown.classList.add('hidden');
        }
    });
}