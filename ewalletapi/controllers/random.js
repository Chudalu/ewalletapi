const handleRandomBalance = (req, res, db) =>{
    const{ randomBalance } = req.body;
    db('users').where('balance', '>=', 0)
    .increment('balance', randomBalance)
    .returning('balance')
    .then(balance => res.json(balance[0]))
}


module.exports = {
    handleRandomBalance: handleRandomBalance
}