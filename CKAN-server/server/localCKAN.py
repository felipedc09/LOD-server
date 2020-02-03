#!/usr/bin/python

import json
import time
from ckanapi import RemoteCKAN
from termcolor import colored


class LocalCKAN(object):
    def __init__(self, query_point):
        self.local_instance = query_point
        self.query_point = RemoteCKAN(query_point)

    def fetch_package_list(self, limit = 0):
        package_list = self.query_point.action.package_list(limit = limit)
        package_list_name = self.format_instance_name(self.local_instance)
        self.create_json_file(package_list, "package_list_" + package_list_name, "../package_list")
        return self.format_json_output(package_list)

    def fetch_package_list_with_resources(self, limit = 0, offset = 0):
        out_temp = ""
        if limit == -1:
            json_temp = json.loads(self.fetch_package_list())
            local_limit = len(json_temp)
            out_temp = self.format_json_output(self.query_point.action.current_package_list_with_resources(limit = local_limit, offset=offset))
        elif limit > 0:
            out_temp = self.format_json_output(self.query_point.action.current_package_list_with_resources(limit = limit))

        return out_temp


    def process_package_list_with_resources(self, limit = 1000):
        metadata = {}
        package_metadata = {}
        package_metadata["result"] = []
        metadata["packages"] = []
        package_list_length = len(json.loads(self.fetch_package_list()))
        local_offset = 0
        while local_offset < package_list_length:
            package_metadata["result"] = package_metadata["result"] + json.loads(self.fetch_package_list_with_resources(limit, local_offset))
            local_offset = local_offset + 1000
            print (colored("paquetes analizados: "+ str(local_offset), "green"))
            print (colored("numero total de paquetes: "+ str(package_list_length), "green"))

        for i in xrange(0, len(package_metadata["result"])):
            temp_obj = {}
            if "title" in package_metadata["result"][i]:
                temp_obj["title"] = package_metadata["result"][i]["title"]
            else:
                temp_obj["title"] = ""
            if "revision_id" in package_metadata["result"][i]:
                temp_obj["revision_id"] = package_metadata["result"][i]["revision_id"]
            else:
                temp_obj["revision_id"] = ""
            if "author" in package_metadata["result"][i]:
                temp_obj["author"] = package_metadata["result"][i]["author"]
            else:
                temp_obj["author"] = ""
            if "license_title" in package_metadata["result"][i]:
                temp_obj["license_title"] = package_metadata["result"][i]["license_title"]
            else:
                temp_obj["license_title"] = ""
            if "metadata_created" in package_metadata["result"][i]:
                temp_obj["metadata_created"] = package_metadata["result"][i]["metadata_created"]
            else:
                temp_obj["metadata_created"] = ""
            if "metadata_modified" in package_metadata["result"][i]:
                temp_obj["metadata_modified"] = package_metadata["result"][i]["metadata_modified"]
            else:
                temp_obj["metadata_modified"] = ""
            if "relationships_as_object" in package_metadata["result"][i]:
                temp_obj["relationships_as_object"] = package_metadata["result"][i]["relationships_as_object"]
            else:
                temp_obj["relationships_as_object"] = ""
            if "relationships_as_subject" in package_metadata["result"][i]:
                temp_obj["relationships_as_subject"] = package_metadata["result"][i]["relationships_as_subject"]
            else:
                temp_obj["relationships_as_subject"] = ""

            if "organization" in package_metadata["result"][i]:
                org_temp_obj = {}
                org_temp_obj = package_metadata["result"][i]["organization"]
                if package_metadata["result"][i]["organization"]:
                    temp_obj["organization_description"] = org_temp_obj["description"]
                else:
                    temp_obj["organization_description"] = ""
            else:
                temp_obj["organization_description"] = ""

            temp_obj["resources"] = []
            for j in xrange(0, len(package_metadata["result"][i]["resources"])):
                temp_obj_resources = {}
                if "name" in  package_metadata["result"][i]["resources"][j]:
                    temp_obj_resources["name"] = package_metadata["result"][i]["resources"][j]["name"]
                else:
                    temp_obj_resources["name"] = ""
                if "last_modified" in  package_metadata["result"][i]["resources"][j]:
                    temp_obj_resources["last_modified"] = package_metadata["result"][i]["resources"][j]["last_modified"]
                else:
                    temp_obj_resources["last_modified"] = ""
                if "state" in  package_metadata["result"][i]["resources"][j]:
                    temp_obj_resources["state"] = package_metadata["result"][i]["resources"][j]["state"]
                else:
                    temp_obj_resources["state"] = ""
                if "url" in  package_metadata["result"][i]["resources"][j]:
                    temp_obj_resources["url"] = package_metadata["result"][i]["resources"][j]["url"]
                else:
                    temp_obj_resources["url"] = ""
                if "format" in  package_metadata["result"][i]["resources"][j]:
                    temp_obj_resources["format"] = package_metadata["result"][i]["resources"][j]["format"]
                else:
                    temp_obj_resources["format"] = ""
                if "hash" in  package_metadata["result"][i]["resources"][j]:
                    temp_obj_resources["hash"] = package_metadata["result"][i]["resources"][j]["hash"]
                else:
                    temp_obj_resources["hash"] = ""
                temp_obj["resources"].append(temp_obj_resources)

            temp_obj["tags"] = []
            for k in xrange(0, len(package_metadata["result"][i]["tags"])):
                temp_obj_tags = {}
                if "display_name" in package_metadata["result"][i]["tags"][k]:
                    temp_obj_tags["tag_name"] = package_metadata["result"][i]["tags"][k]["display_name"]
                else:
                    temp_obj_tags["tag_name"] = ""
                if "id" in package_metadata["result"][i]["tags"][k]:
                    temp_obj_tags["tag_id"] = package_metadata["result"][i]["tags"][k]["id"]
                else:
                    temp_obj_tags["tag_id"] = ""
                temp_obj["tags"].append(temp_obj_tags)

            metadata["packages"].append(temp_obj)

        package_list_name = self.format_instance_name(self.local_instance)
        self.create_json_file(metadata, "metadata_" + package_list_name, "../metadata")

    def format_json_output(self, data):
        return json.dumps(data, indent = 4, sort_keys = True)

    def create_json_file(self, data, name, directory):
        with open(directory + "/" + name + ".json", "w") as outfile:
            json.dump(data, outfile, indent = 4, sort_keys = True)

    def format_instance_name(self, name):
        temp_name = name.replace("https://", "")
        temp_name = temp_name.replace("http://", "")
        temp_name = temp_name.replace(".", "_")
        temp_name = temp_name.replace("/", "")
        return temp_name
    
    def get_metadata_by_instance(self, instance):
        print (" ")
        print (colored(instance, "blue"))
        last_time = time.time()
        print (colored("---------------------------------------", "blue"))
        print (colored("Obteniendo package list de: " + instance, "yellow"))
        self.fetch_package_list()
        self.process_package_list_with_resources(-1)
        print ("Tiempo que tardo la recoleccion de datos para " + instance + ": ", (time.time() - last_time), "segundos")
