import webbrowser

class OpenBrowser:
    def __init__(self):
        pass
    def open_browser(self,url):
        """
        Open the default web browser with the specified URL.

        Args:
            url (str): The URL to open in the web browser.
        """
        webbrowser.open(url)


    # # Example usage:
    # url = f"{url}"
    # open_browser(url)
