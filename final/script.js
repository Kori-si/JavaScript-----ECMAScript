// ""Получение данных о пользователе""

// Реализуйте функцию getDataFromAPI, которая принимает идентификатор пользователя (ID) в качестве аргумента и использует fetch для получения данных о пользователе с заданным ID с удаленного сервера. Функция должна возвращать промис, который разрешается с данными о пользователе в виде объекта. Если пользователь с указанным ID не найден, промис должен быть отклонен с соответствующим сообщением об ошибке.

const findUserId = 1

const getUserData = async (userID) => {
    const apiUrl = 'https://api.github.com/users'; // Пример ссылки на API. Содержит массив из 30 пользователей с id от 1 до 46
    const response = await fetch(apiUrl);
    let resultData = 'Пользователь не найден';
    if (response.ok) {
        const parsedJsonData = await response.json(); // Объект, полученный из JSON
        parsedJsonData.forEach((element) => {
            if (element.id === userID) {
                resultData = element;
            }
        });
        return resultData;
    } else {
        return ("Ошибка HTTP: " + response.status);
    }
}


const result = await getUserData(findUserId)
console.log(result);



// ""Отправка данных на сервер""

// Реализуйте функцию saveUserData, которая принимает объект с данными о пользователе в качестве аргумента и использует fetch для отправки этих данных на удаленный сервер для сохранения. Функция должна возвращать промис, который разрешается, если данные успешно отправлены, или отклоняется в случае ошибки.

const user = {
    name: 'John Smith',
    age: 30,
    email: 'john@example.com'
};

const saveUserData = (userObject) => {
    const serverUrl = 'https://httpbin.org/post';

    let data = new FormData();
    data.append('json', JSON.stringify(userObject));

    fetch(serverUrl, {
        method: 'POST',
        body: data
    }).then((response) => {
        if(!response.ok) {
            return Promise.reject(new Error(`Response failed: ${response.status} (${response.statusText})`))
        }
        console.log('User data saved successfully');
        return response.json()
    }).then((data) => {
        const userinfojson = JSON.parse(data.form.json);
        console.log('User data: ',userinfojson);
    }).catch((error) => {
        console.log(error);
    });
}

saveUserData(user)



// ""Изменение стиля элемента через заданное время""

// Напишите функцию changeStyleDelayed, которая принимает идентификатор элемента и время задержки (в миллисекундах) в качестве аргументов. Функция должна изменить стиль элемента через указанное время.

const changeStyleDelayed = (elementId, timeout) => {
    const htmlElement = document.getElementById(elementId);
    setTimeout(() => {
        htmlElement.classList.add('from-red-to-green')
    }, timeout)
}

changeStyleDelayed('test-id', 3000)