# Vhattodo

## About Vhattodo
This project was part of a school course. The idea was to create an app that utilizes MyHelsinki Open API to make it easy to find activities in Helsinki.
## Built with
* []() React Native
* []() [MyHelsinki Open API](http://open-api.myhelsinki.fi/)

## Getting started
To get this project working follow these steps.
### Prerequisites
Installations needed
* npm
  ```sh
  npm install npm@latest -g
  ```
### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Install Expo
    ```sh
    npm install --global expo-cli
    ```
4. Install React Native
    ```sh
    npm i react-native
    ```
5. Install React Native Elements
    ```sh
    npm install react-native-elements
    ```
6. Install React Native checkbox
    ```sh
    expo install @react-native-community/checkbox
    ```
7. Install React Native image box
    ```sh
    npm install i react-native-image-box
    ```
8. Install React Native base
    ```sh
    npm i native-base
    ```
9. Install React Native maps
    ```sh
    npm i react-native-maps
    ```
10. Install React Native navigation
    ```sh
    npm i react-navigation
    ```
11. Install React Native bottom tabs
    ```sh
    npm install @react-navigation/bottom-tabs
    ```
## Usage
How to create a React Native checkbox
* React Native checkbox
  ```sh
  import CheckBox from '@react-native-community/checkbox';
  
<CheckBox
      disabled={false}
      value={ selectedTags.indexOf(item) >= 0 }
      
  //If oncheck value is true, add to list
  onValueChange={(newValue) => { tagOnListOrNot(newValue, item) }}
 />
 
   const tagOnListOrNot = (newValue, tag) => {
        if (newValue === true) {
            setSelectedTags([...selectedTags, tag])
        } else {
            setSelectedTags(selectedTags.filter((current) => current !== tag))
        }
    }
  ```
  How to have list refresh with each tag selection
  ```sh
   //useEffect filter that changes when user selects new tags
    useEffect(() => {
        createFilterTagsString();
    }, [selectedTags]);

    //useEffect for new filter
    useEffect(() => {
        dataFetch();
    }, [fetchString]);
    
        const createFilterTagsString = () => {
        let str = ('tags_search=');
        // For loop of selected tags and creating string to url
        if (selectedTags.length > 0) {
            for (let i = 0; i < selectedTags.length; i++) {
                
                if (selectedTags[i + 1]) {
                    //If after a tag comes a tag
                    str = str.concat(selectedTags[i].replace("&", "%26").replace(/\s+/g, "%20") + "%2C")
                } else {
                    //If a tag is the last one 
                    str = str.concat(selectedTags[i].replace("&", "%26").replace(/\s+/g, "%20") + '&')
                }
                setFetchString(str)
            }
        }
        else {
            setFetchString('')
        }
    }
    const dataFetch = () => {
        let url = `http://open-api.myhelsinki.fi/v1/activities/?${fetchString}language_filter=fi&limit=20`

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setActivities(data.data);
                setCurrentTags(data.tags);
                if (allTags.length === 0) {
                    setAllTags(data.tags)
                }
            })
            .catch((error) => {
                Alert.alert('Something went wrong', error);
            })
    }
  ```

## Contact
* []() [Kristian Law](https://github.com/kristianlaw)
* []() [Niina Blom](https://github.com/niinab)
* []() [Joni Miettinen](https://github.com/Jonnemanni)
* []() [Niko Hautala](https://github.com/Epoggi)
