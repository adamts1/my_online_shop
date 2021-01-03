from wtforms.validators import DataRequired, Optional


class RequiredIf():

    def __init__(self, other_field_name):
        self.other_field_name = other_field_name

    def __call__(self, form, field):
        other_field = form._fields.get(self.other_field_name)
        if other_field is None:
            raise Exception('no field named "%s" in form' % self.other_field_name)
        if other_field.data == False:
            DataRequired()(form, field)


class ReqRadioButton():
    def __init__(self, radio):
        self.radio = radio

    def __call__(self, form, field):
        radio_field = form._fields.get(self.radio)
        if radio_field.data == 'take-away':
            if 't' in field.id:
                DataRequired()(form, field)
            else:
                Optional()(form, field)
        if radio_field.data == 'delivery':
            if 's' in field.id:
                DataRequired()(form, field)
            else:
                Optional()(form, field)