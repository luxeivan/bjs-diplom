//Объект кнопки выхода
const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout((res) => {
        res.success && location.reload();
    })
};

//Получение данных текущего пользователя
ApiConnector.current(res => {
    res.success && ProfileWidget.showProfile(res.data);
});

//Объект курса валют
const ratesBoard = new RatesBoard();

//Получение курса валют
function getСourse() {
    ApiConnector.getStocks((res) => {
        if (res.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(res.data);
        }
    });
};
getСourse();
setInterval(getСourse, 60000);

//Операции с деньгами
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (res) => {
        if (res.success) {
            ProfileWidget.showProfile(res.data);
            moneyManager.setMessage(res.success, 'Успешное добавление средств');
        } else {
            moneyManager.setMessage(res.success, res.error);
        };
    })
};
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (res) => {
        if (res.success) {
            ProfileWidget.showProfile(res.data);
            moneyManager.setMessage(res.success, 'Успешная конвертация средств');
        } else {
            moneyManager.setMessage(res.success, res.error);
        };

    })
};
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (res) => {
        if (res.success) {
            ProfileWidget.showProfile(res.data);
            moneyManager.setMessage(res.success, 'Успешный перевод средств');
        } else {
            moneyManager.setMessage(res.success, res.error);
        };

    })
};

//Избранное
const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((res) => {
    if (res.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(res.data);
        moneyManager.updateUsersList(res.data);
    }
});

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (res) => {
        if (res.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(res.data);
            moneyManager.updateUsersList(res.data);
            favoritesWidget.setMessage(res.success, 'Добавлен пользователь: ' + data.name);
        } else {
            favoritesWidget.setMessage(res.success, res.error);
        };
    });
};

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (res) => {
        if (res.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(res.data);
            moneyManager.updateUsersList(res.data);
            favoritesWidget.setMessage(res.success, 'Удален пользователь: ' + data.name);
        } else {
            favoritesWidget.setMessage(res.success, res.error);
        };
    });
};
