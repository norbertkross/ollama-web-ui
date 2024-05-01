import json


class SaveToJson:
    def __init__(self):
        pass

    def save_dict_to_json(self,data, filename):
        """
        Save a dictionary to a JSON file.

        Args:
            data (dict): The dictionary to be saved.
            filename (str): The filename to save the JSON file as.
        """
        with open(filename, 'w') as json_file:
            json.dump(data, json_file)

    def load_dict_from_json(self,filename):
        """
        Load JSON data from a file into a dictionary.

        Args:
            filename (str): The filename of the JSON file to load.

        Returns:
            dict: The dictionary loaded from the JSON file.
        """
        with open(filename, 'r') as json_file:
            data = json.load(json_file)
        return data

    # Example usage:
    # data = {"name": "John", "age": 30, "city": "New York"}
    #
    # # Save dictionary to JSON file
    # save_dict_to_json(data, 'data.json')
    #
    # # Load dictionary from JSON file
    # loaded_data = load_dict_from_json('data.json')
    #
    # print(loaded_data)  # Output: {'name': 'John', 'age': 30, 'city': 'New York'}

