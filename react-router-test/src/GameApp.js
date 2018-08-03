import React from 'react';

const GradSize = 20; //px;
const StageWidth = 12;
const StageHeight = 12;
const MapData = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const SnakeNodeColor = 'red';
const SnakeInitData = [
    { x: 7, y: 9 },
    { x: 6, y: 9 },
    { x: 5, y: 9 },
    { x: 4, y: 9 },
];

class Grid extends React.Component {
    render() {
        const {
            x = 0,
            y = 0,
            color = '#000',
            isCircle,
        } = this.props;

        return (
            <div
                style={{
                    position: 'absolute',
                    width: GradSize,
                    height: GradSize,
                    left: x * GradSize,
                    top: y * GradSize,
                    background: color,
                    border: '1px solid #fff',
                    borderRadius: isCircle ? '50%' : '0%',
                }}
            >
            </div>
        );
    }
}

class Map extends React.Component {

    render() {

        const { mapData } = this.props;
        const grids = [];

        for (let y = 0; y < StageHeight; y++) {
            for (let x = 0; x < StageWidth; x++) {
                if (mapData[y][x] === 0) {
                    grids.push(
                        <Grid key={`${x}_${y}`} x={x} y={y} color="gray" ></Grid>
                    );
                }
            }
        }

        return (
            <div style={{ position: 'relative' }}>
                {grids}
            </div>
        );
    }

}

class Snake extends React.Component {

    constructor(props) {
        super(props);
        this.loop = this.loop.bind(this);
        this.step = this.step.bind(this);
    }
    componentDidMount() {
        if (this.timeId) {
            clearTimeout(this.timeId);
        }
        this.timeId = setTimeout(this.loop, this.props.snakeSpeed);
    }

    componentWillUnmount() {
        if (this.timeId) {
            clearTimeout(this.timeId);
            this.timeId = null;
        }
    }

    getNewFoodInfo({ snakeNodeData, mapData }) {
        // 空余时间的数量
        let freeGridNum = (StageHeight * StageWidth) - snakeNodeData.length;

        for (let y = 0; y < StageHeight; y++) {
            for (let x = 0; x < StageWidth; x++) {
                if (mapData[y][x] === 0) {
                    freeGridNum--;
                }
            }
        }
        const foodPositionIndex = Math.floor(freeGridNum * Math.random());
        let count = 0;
        for (let y = 0; y < StageHeight; y++) {
            for (let x = 0; x < StageWidth; x++) {
                if (mapData[y][x] === 1 && snakeNodeData.every(item => item.x !== x && item.y !== y)) {
                    count++
                    if (foodPositionIndex === count) {
                        return {
                            x,
                            y,
                        };
                    }
                }
            }
        }


    }

    step() {

        const { onChange, nextSnakeDirect, snakeNodeData, mapData, foodInfo } = this.props;
        const [{ x: headX, y: headY }] = snakeNodeData;

        // 是否撞墙
        if (!mapData[headY] || !mapData[headY][headX]) {
            return;
        }

        // 是否撞到自己
        if (snakeNodeData.slice(1).some(item => item.x === headX && item.y === headY)) {
            return;
        }

        const newHeadNode = { x: headX, y: headY };
        if (nextSnakeDirect === 'w') {
            newHeadNode.y--;
        }
        if (nextSnakeDirect === 's') {
            newHeadNode.y++;
        }
        if (nextSnakeDirect === 'a') {
            newHeadNode.x--;
        }
        if (nextSnakeDirect === 'd') {
            newHeadNode.x++;
        }
        const newSnakeNodeData = [
            newHeadNode,
            ...snakeNodeData.slice(0, snakeNodeData.length - 1),
        ];

        const changeData = {};

        if (foodInfo) {
            if (newHeadNode.x === foodInfo.x && newHeadNode.y === foodInfo.y) {
                newSnakeNodeData.push(snakeNodeData[snakeNodeData.length - 1]);
                changeData.foodInfo = this.getNewFoodInfo({ snakeNodeData: newSnakeNodeData, mapData });
            }
        } else {
            changeData.foodInfo = this.getNewFoodInfo({ snakeNodeData: newSnakeNodeData, mapData });
        }

        changeData.snakeNodeData = newSnakeNodeData;
        changeData.snakeDirect = nextSnakeDirect;
        onChange && onChange(changeData);

    }

    loop() {
        if (this.props.snakeIsActive) {
            this.step();
        }
        this.timeId = setTimeout(this.loop, this.props.snakeSpeed);
    }

    render() {
        const { snakeNodeData, foodInfo } = this.props;
        const nodes = snakeNodeData.map(({ x, y }) => (
            <Grid key={`snakeNode_${x}_${y}`} x={x} y={y} color={SnakeNodeColor} isCircle ></Grid>
        ));
        if (foodInfo) {
            nodes.push(
                <Grid key="food" x={foodInfo.x} y={foodInfo.y} color='green' ></Grid>
            );
        }
        return (
            <div style={{ position: 'relative' }}>
                {nodes}
            </div>
        );
    }

}

class Stage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            snakeNodeData: SnakeInitData,
            snakeIsActive: true,
            snakeSpeed: 400,
            nextSnakeDirect: 'd',
        };

        this.handleSnakeChange = this.handleSnakeChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleSnakeChange(changeData) {
        this.setState(changeData);
    }

    handleKeyDown(e) {
        const { snakeDirect } = this.state;
        let { key } = e;
        key = key.toLowerCase();
        if (
            (key === 'w' && snakeDirect !== 's') ||
            (key === 's' && snakeDirect !== 'w') ||
            (key === 'a' && snakeDirect !== 'd') ||
            (key === 'd' && snakeDirect !== 'a')
        ) {
            this.handleSnakeChange({
                nextSnakeDirect: key,
            });
        } else if (key === 'r') {
            this.handleSnakeChange({
                snakeNodeData: SnakeInitData,
                nextSnakeDirect: 'd',
                snakeIsActive: true,
            });
        }
    }

    render() {
        const {
            snakeNodeData,
            snakeDirect,
            snakeIsActive,
            nextSnakeDirect,
            snakeSpeed,
            foodInfo,
        } = this.state;
        const {
            mapData,
        } = this.props;
        return (
            <div style={{ position: 'relative', width: StageWidth * GradSize, height: StageHeight * GradSize, border: '1px solid gray' }}>
                <div style={{ position: 'absolute', top: 0, left: 0 }}>
                    <Map mapData={mapData}></Map>
                </div>
                <div style={{ position: 'absolute', top: 0, left: 0 }}>
                    <Snake
                        snakeNodeData={snakeNodeData}
                        mapData={mapData}
                        snakeDirect={snakeDirect}
                        snakeIsActive={snakeIsActive}
                        snakeSpeed={snakeSpeed}
                        onChange={this.handleSnakeChange}
                        foodInfo={foodInfo}
                        nextSnakeDirect={nextSnakeDirect}
                    >
                    </Snake>
                </div>
            </div>
        );
    }

}

class App extends React.Component {

    render() {
        return (
            <div>
                <Stage mapData={MapData} />
                <div>
                    <p>上: W   下: S    左: A    右: D</p>
                    <p>重置: R</p>
                </div>
            </div>
        );
    }
}

export default App
