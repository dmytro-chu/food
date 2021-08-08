// функция запроса на сервер
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
            //Заголовки нужны для работы с JSON
            headers: {
                'Content-type': 'application/json'
            },
            body: data // formData - если работаем с форм датой;
    });

    return await res.json();
};

async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {  //"ok" - метод fetch
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}

export {postData};
export {getResource};