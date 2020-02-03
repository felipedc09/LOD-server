#!usr/bin/python
import json

class JsonUtilities(object):

    def clean_name(self,name):
        temp = name.replace("metadata_", "")
        final = temp.replace(".json", "")
        return final

    def convert_to_json(self, elm):
        temp = json.dumps(elm)
        temp_u = temp.replace('\\', '').replace("'", '"')
        temp_rb = temp_u.replace('"{', '{')
        temp_lb = temp_rb.replace('}"', '}')
        return temp_lb
