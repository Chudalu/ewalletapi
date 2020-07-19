const handleWithdraw = (req, res, db) => {
    const{ id, withdrawInput } = req.body;
    const withdrawal = Number(withdrawInput);
    
    db('users').where('id', '=', id)
    .decrement('balance', withdrawal)
    .returning('balance')
    .then(balance => res.json(balance[0]))
    .catch(err => res.status(400).json('unable to get entries'))
}


module.exports = {
    handleWithdraw: handleWithdraw
}