<?php
    class Team {
        public $team_logo;
        public $team_name;
        public $team_points;

        public function __construct($im, $nam, $point) {
            $this->team_logo = $im;
            $this->team_name = $nam;
            $this->team_points = $point;
        }
    }
    header("Access-Control-Allow-Origin: *");
    header("'Content-Type: application/json'");
    include "parser.php";
    if(isset($_GET["league"])) {
        $liga = $_GET["league"];
        $content = file_get_contents("https://onefootball.com/de/wettbewerb/$liga/tabelle");
        $html = str_get_html($content);
        $result = (array) null;
        
        foreach($html->find(".standings__row--link") as $element) {
            $teamName = $element->find(".standings__team-name")[0]->innerText();
            $teamLogoUrl = $element->find(".of-image__picture")[0]->src;
            $teamPoints = $element->find(".standings__cell")[7]->find("span")[0]->innerText();
            $tempteam = new Team($teamLogoUrl, $teamName, $teamPoints);
            array_push($result, $tempteam);
        }
        //usort($result, fn($a, $b) => $a->team_points - $b->team_points);     
        echo json_encode($result);
    }