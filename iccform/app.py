from flask import Flask, render_template, request
import sqlite3

app = Flask(__name__,static_url_path='/static')
app.config["TEMPLATES_AUTO_RELOAD"] = True
@app.route('/')
@app.route('/home')
def homepage():
    return render_template('index.html')

@app.route('/register',methods=['POST', 'GET'])
def registerpage():



    selectCmd = """SELECT * FROM """
    #cursor.execute(selectCmd)
    if request.method == 'POST':
        columnNames = []
        dictData = request.form.getlist("getdata[]")
        print(dictData)
        tabelName = dictData[1]
        print("register")
        con = sqlite3.connect('formdb.db')
        cursor = con.cursor()
        selectCmd = """PRAGMA table_info("""+tabelName+""") """
        res = cursor.execute(selectCmd)
        for i in res:
            columnNames.append(i[1])




        return ({'col':columnNames})
    return render_template('formRegisteration.html')

@app.route("/confim", methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        con = sqlite3.connect('formdb.db')
        cursor = con.cursor()



        res = request.form.getlist("getdata[]")

        tabelcmd = """CREATE TABLE IF NOT EXISTS """+res[-1]+"""(user_id INTEGER PRIMARY KEY"""

        for i in range(0,len(res)-1):
            if(res[i] == "PhoneNumber"):
                temp = ""","""+res[i] + """ INTEGER """
            else:
                temp = ""","""+res[i]+""" TEXT """
            tabelcmd = tabelcmd+temp
        tabelcmd = tabelcmd+""")"""
        print(tabelcmd)
        cursor.execute(tabelcmd)
        return ("hello")

@app.route("/submit", methods=['POST', 'GET'])
def submit():
    if request.method == 'POST':
        con = sqlite3.connect('formdb.db')
        cursor = con.cursor()
        colValues = request.form.getlist("getdata[]")
        colData = request.form.getlist("coldata[]")
        tableCmd = """INSERT INTO """+colData[-1]+""" ("""+colData[0]
        for i in range(1,len(colData)-1):
            temp = ""","""+colData[i]
            tableCmd = tableCmd+temp
        tableCmd = tableCmd+""") VALUES('"""+colValues[0]+"""'"""
        for j in range(1,len(colValues)):
            if(colData[j] == "PhoneNumber"):
                temp = """, """ + colValues[j]
                tableCmd = tableCmd + temp
            else:
                temp = """, '"""+colValues[j]+"""'"""
                tableCmd = tableCmd + temp
        tableCmd = tableCmd + """)"""
        cursor.execute(tableCmd)
        con.commit()
        return ("hello")

if __name__ == "__main__":
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(debug=True)