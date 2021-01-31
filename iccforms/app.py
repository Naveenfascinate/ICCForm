from flask import Flask, render_template, request
import sqlite3
import json
import ast

# Setting Static files URL paths
app = Flask(__name__,static_url_path='/static')
app.config["TEMPLATES_AUTO_RELOAD"] = True

# HomePage
@app.route('/')
@app.route('/home')
def homepage():
    return render_template('index.html')


# Home page submit functionality
@app.route("/homesubmit", methods=['POST', 'GET'])
def homeSubmit():
    # Getting data using POST method
    if request.method == 'POST':
        # Connecting sqlLite Database
        con = sqlite3.connect('formdb.db')
        cursor = con.cursor()

        # Getting data from user
        formData = request.get_json()
        print(formData.keys())
        formName = formData["formName"]

        #formName = formData['formName']

        # Inserting data to database
        tabelcmd = 'INSERT INTO userforms (form_name,form_data) values ("' + formName + '","' \
                   + str(formData) + '")'
        cursor.execute(tabelcmd)
        con.commit()

        return "success"


@app.route('/register',methods=['POST', 'GET'])
def registerpage():

    if request.method == 'POST':
        columnNames = []
        Data = request.form.getlist("getdata[]")
        print(Data)
        formName = Data[1]
        print("register")
        con = sqlite3.connect('formdb.db')
        cursor = con.cursor()
        selectCmd = "SELECT form_data,response_data FROM userforms WHERE form_name = '"+formName+"'"
        tabelData = cursor.execute(selectCmd)
        print(tabelData)
        for i in tabelData:
            print(i[0])
            jsonData = json.dumps(i[0])
            jsonFormData = json.loads(jsonData)
            print(type(jsonFormData))





        return ({'formData':jsonFormData})
    return render_template('formRegisteration.html')


@app.route("/submit", methods=['POST', 'GET'])
def submit():
    if request.method == 'POST':
        result ={}
        con = sqlite3.connect('formdb.db')
        cursor = con.cursor()

        data = request.form.get("resultdata")
        data = ast.literal_eval(data)
        questions = request.form.getlist("question[]")
        questionTypes = request.form.getlist("questionType[]")
        formName = request.form.get("getdata")
        print(formName)
        selectCmd = "SELECT response_data FROM userforms WHERE form_name = '" + formName + "'"
        tabelData = cursor.execute(selectCmd)
        print(data)
        for i in tabelData:
            print(i[0])
            if i[0] == None:
                for j in range(len(questions)):
                    result[questions[j]]=[data[j]]
            else:
                #temp = json.dumps(i[0])
                result = i[0].replace("\'", "\"")
                result = json.loads(result)
                for j in range(len(questions)):

                    result[questions[j]].append(data[j])

        print(result)
        tabelcmd = 'UPDATE userforms SET response_data = "'+str(result)+'" WHERE form_name = "'+formName+'"'
        print(tabelcmd)
        cursor.execute(tabelcmd)
        con.commit()
        return ("hi")

if __name__ == "__main__":
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(debug=True)