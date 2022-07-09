const levels = [
    {
        levelTitle: "hello world",
        levelSubtitle: "aaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa a aaaaaaa aaaaaaaaaaaaa aaa aaaaaaaaaa a",
        ruleset: [new Rule([new Point(0, 0, Colors.black)], [new Point(0, 0, Colors.white)], RuleTypes.then)],
        solutions: [
            [new Rule([new Point(0, 0, Colors.black)], [new Point(0, 0, Colors.white)], RuleTypes.then)]
        ]
    },
    {
        levelTitle: "goodbye world",
        levelSubtitle: "bbbbbbbbb b b aaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa a aaaaaaa aaaaaaaaaaaaa aaa aaaaaaaaaa a",
        ruleset: [
            new Rule([new Point(0, 0, Colors.black)], [new Point(0, 0, Colors.white)], RuleTypes.runOnce),
            new Rule([new Point(0, 0, Colors.white), new Point(1, 0, Colors.black)], [new Point(1, 0, Colors.white)], RuleTypes.then)
        ],
        solutions: [
            [
                new Rule([new Point(0, 0, Colors.black)], [new Point(0, 0, Colors.white)], RuleTypes.runOnce),
                new Rule([new Point(0, 0, Colors.white), new Point(1, 0, Colors.black)], [new Point(1, 0, Colors.white)], RuleTypes.then)
            ]
        ]
    }
]