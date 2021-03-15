function makeApiCall(uri, callback) {
    $.ajax(uri)
        .done(callback)
        .fail(err => console.error(err));
}

function getProperty(object, path) {
    if (!object.hasOwnProperty(path[0])) {
        return null;
    }
    if (path.length > 1) {
        return getProperty(object[path[0]], path.slice(1));
    }
    else {
        return object[path[0]];
    }
}

function addSection(configSection) {
    makeApiCall(configSection.uri, response => {
        const body = $("body");
        const title = configSection.hasOwnProperty("title") ? configSection.title : configSection.id;
        let newCard = `<div class="card"><div class="card-body"><h5 class="card-title">${title}</h5></div>`;

        newCard += `<table class="table table-striped"><thead><tr>`;
        configSection.columns.forEach(column => {
            newCard += `<th scope="col">${column.name}</th>`;
        });
        newCard += `</tr></thead><tbody>`;

        response.forEach(result => {
            newCard += `<tr>`;
            configSection.columns.forEach(column => {
                let cell = `<td>`;

                if (column.hasOwnProperty('image')) {
                    const imageSrc = getProperty(result, column.image.split('.'));
                    cell += `<img class="circular-image" src=${imageSrc}/>`;
                }

                if (column.hasOwnProperty('link')) {
                    const linkUrl = getProperty(result, column.link.split('.'));
                    cell += `<a href=${linkUrl}>`;
                }

                const value = getProperty(result, column.path.split('.'));
                cell += `${value}`;

                if (column.hasOwnProperty('link')) {
                    cell += `</a>`;
                }

                cell += `</td>`;
                newCard += cell;
            });
            newCard += `</tr>`;
        });
        newCard += `</tbody></table>`
        body.append(newCard);
    });
}

function setup() {
    // config is not defined in this file, but is loaded from the config.js script by the html page.
    config.apis.forEach(apiConfig => addSection(apiConfig));
}

$(document).ready(setup);