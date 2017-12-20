const config = {
  nbEnemies: 6,
  cellWidth: 101,
  cellHeight: 83,
  nbWaterRows: 1,
  nbStoneRows: 3,
  nbGrassRows: 2,
  numRows() { return this.nbWaterRows + this.nbStoneRows + this.nbGrassRows },
  numCols() { return 5 },
}

