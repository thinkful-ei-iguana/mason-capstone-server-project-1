

const AlertsServices = {
  getAllMyAlerts(knex, user_id) {
    return knex.select('*').from('live_alert_alerts')
      .where('user_id', user_id);
  },

  getAllMyContactAlerts(knex, user_id) {
    return knex('live_alert_contacts')
      .join('live_alert_alerts', 'live_alert_contacts.user_contacts', '=', 'live_alert_alerts.user_id')
      .where('live_alert_contacts.user_id', user_id);
  },

  insertAlert(knex, newAlert) {
    return knex
      .insert(newAlert)
      .into('live_alert_alerts')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex
      .from('live_alert_alerts')
      .select('*')
      .where('id', id)
      .first();
  },

  deleteAlert(knex, id) {
    return knex('live_alert_alerts')
      .where({ id })
      .delete();
  },

  updateAlert(knex, id, newAlertFields) {
    return knex('live_alert_alerts')
      .where({ id })
      .update(newAlertFields);
  }
};

module.exports = AlertsServices;
