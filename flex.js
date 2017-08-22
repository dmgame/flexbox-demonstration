function showMeesage(el){
    var element = el;

    this.message = (mes) => {
        element.innerText = mes;
        return this;
    }
    this.show = () => {
        element.style.top = '50px';
        return this;
    }
    this.hide = () => {
        element.style.top = '-100%';
        setTimeout(this.removeClass, 1000);
        return this;
    }
    this.info = () => {
        element.classList.add('info');
        return this;
    }
    this.warning = () => {
        element.classList.add('warning');
        return this;
    }
    // this.error = () => {
    //     element.classList.add('error');
    //     return this;
    // }

    this.newmethod = () => {
        console.log('new method');
    }

    this.second = () => {
        console.log('add something new');
    }

    this.removeClass = () => {
        if (element.classList.contains('warning')) element.classList.remove('warning');
        if (element.classList.contains('error')) element.classList.remove('error');
        if (element.classList.contains('info')) element.classList.remove('info');        
                
    }
    this.on = (event, handler) => element.addEventListener(event, handler);
}

var messageBlock = new showMeesage(document.querySelector('.message'));
messageBlock.on('click', messageBlock.hide);

var flex_container = document.querySelector('.flex-container');
var flex_control = document.forms['choose-role'];
var flex_control_radio = [].slice.call(flex_control.elements['display']);
var flex_control_radio_direction = [].slice.call(flex_control.elements['direction']);
var flex_control_height = flex_control.elements['height'];
var flex_control_justify = [].slice.call(flex_control.elements['justify']);
var flex_control_wrap = [].slice.call(flex_control.elements['wrap']);
var flex_control_items = [].slice.call(flex_control.elements['items']);
var flex_control_content = [].slice.call(flex_control.elements['content']);

var align_items_on_off = flex_control.elements['alignItemsOnOff'];
var align_content_on_off = flex_control.elements['alignContentOnOff'];




// отслеживание изменения display
flex_control_radio.forEach(radio => radio.addEventListener('change', e => flex_container.style.display = radio.value) );

// при изменении display менять свойство disabled у определенных radio
flex_control_radio.forEach(radio => radio.addEventListener('change', e => {
    var disabled_status = radio.value !== 'block' && radio.checked === true ? false : true;

    flex_control_radio_direction.forEach(direction => direction.disabled = disabled_status);
    flex_control_justify.forEach(justify => justify.disabled = disabled_status);
    flex_control_wrap.forEach(wrap => wrap.disabled = disabled_status);    
    align_items_on_off.disabled = disabled_status;
    align_content_on_off.disabled = disabled_status;
    flex_control_height.disabled = disabled_status;

    if (radio.value === 'inline-flex') {
        messageBlock.message(`Со свойством ${radio.value} результат изменения justify-content не виден`)
            .warning()
            .show();
    } else if (radio.value === 'block'){
        flex_container.style.height = 'auto';
        align_items_on_off.checked = false;
        align_content_on_off.checked = false;
        flex_control_items.forEach(item => item.disabled = true);    
        flex_control_content.forEach(item => item.disabled = true);    
        messageBlock.message(`Со свойством ${radio.value} не возможно применение flex`)
            .warning()
            .show();
    }
}));

// отслеживание изменения direction
flex_control_radio_direction.forEach(direction => direction.addEventListener('change', e => {
    flex_container.style.flexDirection = direction.value;
    
} ));

// отслеживание изменения height
flex_control_height.addEventListener('change', e => {
    console.log(flex_control_height.value)
    flex_container.style.height = flex_control_height.value < 155 ? '155px' : `${flex_control_height.value}px`;
    if (flex_control_height.value < 155) {
        messageBlock.message(`Нельзя устанавливать высоту меньше 155px`)
            .error()
            .show();
    }
});

// отслеживание изменения justify-content
flex_control_justify.forEach(radio => radio.addEventListener('change', e => flex_container.style.justifyContent = radio.value));

// отслеживание flex-wrap
flex_control_wrap.forEach(radio => radio.addEventListener('change', e => {
    flex_container.style.flexWrap = radio.value;
    flex_container.style.width = radio.value !== 'nowrap' ? '700px' : 'auto';
    if (radio.value !== 'nowrap') {
        messageBlock.message(`Ширина контейнера установлена в размере 700px`)
            .info()
            .show();
    }
}))


// отслеживание align-items
align_items_on_off.addEventListener('change', e => {
    if (align_content_on_off.checked){
        messageBlock.message(`Предварительно выключите свойство align-content`)
            .warning()
            .show();
        align_items_on_off.checked = false;
        return;
    }

    if (align_items_on_off.checked){
        flex_container.style.alignContent = '';
        messageBlock.message(`Высота контейнера установлена в размере 400px`)
            .info()
            .show();
    }

    flex_container.style.height = align_items_on_off.checked ? '400px' : 'auto';
    flex_control_items.forEach(item => item.disabled = !align_items_on_off.checked);
})

flex_control_items.forEach(radio => radio.addEventListener('change', e => {
    flex_container.style.alignItems = radio.value
}));

// отслеживание align-content
align_content_on_off.addEventListener('change', e => {
    if (align_items_on_off.checked) {
        messageBlock.message(`Предварительно выключите свойство align-items`)
            .warning()
            .show();
        align_content_on_off.checked = false;
        return;
    }

    if (align_content_on_off.checked){
        flex_container.style.alignItems = '';
        messageBlock.message(`Высота контейнера установлена в размере 400px. Установите свойство flex-wrap: wrap или wrap-reverse и flex-direction: row или row-reverse`)
            .info()
            .show();
    }
    
    flex_container.style.height = align_content_on_off.checked ? '400px' : 'auto';
    flex_control_content.forEach(item => item.disabled = !align_content_on_off.checked);
})

flex_control_content.forEach(radio => radio.addEventListener('change', e => {
    flex_container.style.alignContent = radio.value
}));