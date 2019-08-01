/**
 * random get_status_id
 *
 * @description :: return the name of the status collection by _id
 * @help        :: check the collection status in the database
 */

module.exports = function(key){
  var status = {
    'active'            : '5d3a08bf0f10e27b34624872',
    'activation_pending': '5d3a08bf0f10e27b34624873',
    'suspended'         : '5d3a08bf0f10e27b34624874',
    'deleted'           : '5d3a08bf0f10e27b34624875',
  };
  return status[key];
}
