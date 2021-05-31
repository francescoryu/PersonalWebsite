function loadTable(name){
            $.ajax({
              url:"https://eliaschenker.com/SoccerAPI/gettable.php?league=" + name,
              success:function(result){
                let data = result;
                data = JSON.parse(data);
                  console.log(data);
        for (var i = 0; i < data.length; i++) {
                let place = i + 1;
                let teamName = data[i]["team_name"];
                let punkte = data[i]["team_points"];
                let logo = data[i]["team_logo"];
                var img = document.createElement("img");
                img.src = logo;
                img.className = "logoScalingLeague";
                var text = document.createElement("p");
                text.innerHTML = "<img style='float:left; margin-right: 10px;' src=" + logo + ">" + teamName;

                var table = document.getElementById("tBody");

                var row = table.insertRow(-1);

                var cell1 = row.insertCell(-1);
                var cell2 = row.insertCell(-1);
                var cell3 = row.insertCell(-1);

                cell1.innerHTML = i + 1;
                cell2.appendChild(text);
                cell3.innerHTML = punkte;


              }
            }
    });

}


function loadGames(name, id){
            $.ajax({
              url:"https://eliaschenker.com/SoccerAPI/getgames.php?league=" + name,
              success:function(result){
                let data = result;
                data = JSON.parse(data);
                  console.log(data);
        for (var i = 0; i < 3; i++) {
                let teamName1 = data[i]["team1"];
                let teamName2 = data[i]["team2"];
                let score1 = data[i]["score1"];
                let score2 = data[i]["score2"];
                let logo1 = data[i]["img1"];
                let logo2 = data[i]["img2"];
                let gameDate = data[i]["date"];
                var img1 = document.createElement("img");
                img1.src = logo1;
                img1.className = "logoScalingGames";
                var text1 = document.createElement("p");

                var img2 = document.createElement("img");
                img2.src = logo2;
                img2.className = "logoScalingGames";
                var text2 = document.createElement("p");

                var table = document.getElementById(id);

                table.className = "";



                var row1 = table.insertRow(-1);

                var cell1 = row1.insertCell(-1);
                var cell2 = row1.insertCell(-1);
                var cell3 = row1.insertCell(-1);
                var cell4 = row1.insertCell(-1);
                var cell5 = row1.insertCell(-1);
                var cell6 = row1.insertCell(-1);

                cell1.className = "tdSize";
                cell2.className = "tdSize";
                cell3.className = "tdSize";
                cell4.className = "tdSize";
                cell5.className = "tdSize";
                cell6.className = "tdSize";

                cell1.appendChild(img1);
                cell2.innerHTML = "<center style='font-size:30px'>" + teamName1 + "<br>" + score1 + "</center>";
                cell3.innerHTML = "<center style='font-size:60px'>    :    </center>";
                cell4.innerHTML = "<center style='font-size:30px'>" + teamName2 + "<br>" + score2 + "</center>";
                cell5.appendChild(img2);
                cell6.innerHTML = gameDate.substring(0, 10);
              }
            }
    });

}
