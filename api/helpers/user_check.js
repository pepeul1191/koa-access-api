/**
 * user_check helper
 *
 * @description :: return an array of students if user and pass exists in db
 * @help        :: use an await when call the function
 */

const User = require('../models/user');

module.exports = function(user, pass){
  return User.aggregate([
    {
      $match: {
        $and: [
          {
            'user': user
          },
          {
            'pass': pass
          },
        ],
      },
    },
    {
      $lookup: {
        'from': 'states',
        'localField': 'state_id',
        'foreignField': '_id',
        'as': 'user_state'
      }
    },
    {
      $unwind: '$user_state'
    },
    {
      $project:{
        _id : 1,
        email : 1,
        user : 1,
        state : '$user_state.name',
      }
    }
  ])
};
