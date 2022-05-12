<?php
    class Game
    {
        public $img1;
        public $img2;
        public $team1;
        public $team2;
        public $score1;
        public $score2;
        public $date;

        public function __construct($im1, $im2, $tea1, $tea2, $scor1, $scor2, $dat) {
            $this->img1 = $im1;
            $this->img2 = $im2;
            $this->team1 = $tea1;
            $this->team2 = $tea2;
            $this->score1 = $scor1;
            $this->score2 = $scor2;
            $this->date = $dat;
        }
    }
    header("Access-Control-Allow-Origin: *");
    header("'Content-Type: application/json'");
    include "parser.php";
    if(isset($_GET["league"])) {
        $liga = $_GET["league"];
        $content = file_get_contents("https://onefootball.com/de/wettbewerb/$liga/spiele");
        $html = str_get_html($content);
        $result = (array) null;

        foreach($html->find(".simple-match-cards-list__match-card") as $element) {
            $team1Score = $element->find("span")[1]->innerText();
            $team2Score = $element->find("span")[3]->innerText();
            //If the score is empty, the game hasn't been played (don't add it to the arrays)
            if($team1Score == "  " || $team2Score == "  ") {
                continue;
            }
            
            $team1Name = $element->find("span")[0]->innerText();
            $team2Name = $element->find("span")[2]->innerText();

            $team1LogoUrl = $element->find(".of-image__img")[0]->src;
            $team2LogoUrl = $element->find(".of-image__img")[1]->src;

            $gameDate = $element->find("time")[0]->innerText();
            $tempGame = new Game($team1LogoUrl, $team2LogoUrl, $team1Name, $team2Name, $team1Score, $team2Score, $gameDate);
            array_push($result, $tempGame);
        }
        $result = array_reverse($result);
        echo json_encode(array_reverse($result));
    }
?>