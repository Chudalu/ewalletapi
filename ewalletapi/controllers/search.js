const handleSearch = (req, res, db) => {
    const{ nameInput, balanceInput } = req.body;
    const balance = Number(balanceInput)
   
    db('users').where('name', '=', nameInput).orWhere('balance', '=', balance)
        .returning('*')
        .then(searchResult => res.json(searchResult))
        .catch(err => res.status(400).json('unable to get entries'))
}


module.exports = {
    handleSearch: handleSearch
}