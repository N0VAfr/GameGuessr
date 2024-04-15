<?php

namespace Manager{

    use ConnexionController;
    use DateTimeImmutable;

    class GameManager
    {
        private $conn;
        private int $idGame;
        private DateTimeImmutable $date;
        private string $name, $genre, $released, $esrb, $score;

        /**
         * @param int $idGame
         * @param DateTimeImmutable $date
         * @param string $name
         * @param string $genre
         * @param string $released
         * @param string $esrb
         * @param string $score
         */
        public function __construct()
        {
            $this->conn = new ConnexionController();
        }

        public function getIdGame(): int
        {
            return $this->idGame;
        }

        public function setIdGame(int $idGame): void
        {
            $this->idGame = $idGame;
        }

        public function getDate(): DateTimeImmutable
        {
            return $this->date;
        }

        public function setDate(DateTimeImmutable $date): void
        {
            $this->date = $date;
        }

        public function getName(): string
        {
            return $this->name;
        }

        public function setName(string $name): void
        {
            $this->name = $name;
        }

        public function getGenre(): string
        {
            return $this->genre;
        }

        public function setGenre(string $genre): void
        {
            $this->genre = $genre;
        }

        public function getReleased(): string
        {
            return $this->released;
        }

        public function setReleased(string $released): void
        {
            $this->released = $released;
        }

        public function getEsrb(): string
        {
            return $this->esrb;
        }

        public function setEsrb(string $esrb): void
        {
            $this->esrb = $esrb;
        }

        public function getScore(): string
        {
            return $this->score;
        }

        public function setScore(string $score): void
        {
            $this->score = $score;
        }

        public function searchGame($idHash, $dateGame, $nameGame, $genreGame, $releasedGame, $esrbGame, $scoreGame)
        {
            $sql = "INSERT INTO randomgameoftheday (idGame, date, name, genre, released, esrb, score) VALUES (:idGame, :date, :name, :genre, :released, :esrb, :score)";
            $stmt= $this->conn->pdo->prepare($sql);
            $stmt->bindParam(':idGame', $idHash, PDO::PARAM_STR);
            $stmt->bindParam(':date', $dateGame, PDO::PARAM_STR);
            $stmt->bindParam(':name', $nameGame, PDO::PARAM_STR);
            $stmt->bindParam(':genre', $genreGame, PDO::PARAM_STR);
            $stmt->bindParam(':released', $releasedGame, PDO::PARAM_STR);
            $stmt->bindParam(':esrb', $esrbGame, PDO::PARAM_STR);
            $stmt->bindParam(':score', $scoreGame, PDO::PARAM_STR);

            if (!$stmt->execute()) {
                die("Error executing SQL: " . $stmt->errorInfo()[2]);
            }
        }

    }
}