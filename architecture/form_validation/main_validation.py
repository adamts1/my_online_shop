from architecture.form_validation.require_if import RequiredIf, ReqRadioButton
from wtforms import Form, BooleanField, StringField, validators, DateField, RadioField, SelectField


class RegistrationForm(Form):
    first_name = StringField('first_name', [validators.required()])
    sure_name = StringField('sure_name', [validators.required()])
    phone = StringField('phone', [validators.required(), validators.Length(min=1, max=12)])
    address = StringField('address', [validators.required(), validators.Length(min=1, max=25)])
    city = StringField('city', [validators.required()])

    # First Section address is not checked
    f_s_delivery = BooleanField('', false_values=None)
    s_first_name = StringField('s_first_name',  [RequiredIf('f_s_delivery')])
    s_sure_name = StringField('s_sure_name', [RequiredIf('f_s_delivery')])
    s_address = StringField('s_address', [RequiredIf('f_s_delivery')])
    s_phone = StringField('s_phone', [RequiredIf('f_s_delivery')])
    s_city = StringField('s_city', [RequiredIf('f_s_delivery')])

    # # Shipping method radio button
    s_method = RadioField('', choices=[('take-away','איסוף עצמי מיד חרוצים'),('delivery','שליח עד הבית עד 24 שעות 25.00 ₪')])

    # Shipping method delivery`
    s_day = DateField('s_day', [ReqRadioButton('s_method')])
    s_hour =SelectField('', choices=[('12', '12:00'), ('13', '13:00'), ('17', '17:00')])

    # # Shipping method take-away
    t_day = DateField('t_day', [ReqRadioButton('s_method')])
    t_hour = SelectField('', choices=[('12', '12:00'), ('13', '13:00'), ('17', '17:00')])


    p_method = RadioField('', choices=[('credit', 'תשלום באשראי'),('phone', 'תשלום בטלפון')])