m = document.getElementById("life").getContext("2d");

draw = (x, y, c, s) => {
  m.fillStyle = c;
  m.fillRect(x, y, s, s);
};


particles = [];
particle = (x, y, c) => {
  return {"x": x, "y": y, "vx": 0, "vy": 0, "color": c};
};

random = () => {
  return Math.random() * 460 + 20;
};

create = (number, color) => {
  group = [];
  for(let i = 0; i < number; ++i) {
    group.push(particle(random(), random(), color));
    particles.push(group[i]);
  }
  return group;
};

rule = (particles1, particles2, g) => {
  for(let i = 0; i < particles1.length; ++i) {
    fx = 0;
    fy = 0;
    for(let j = 0; j < particles2.length; ++j) {
      a = particles1[i];
      b = particles2[j];

      // calculate distance between particles 
      dx = a.x - b.x;
      dy = a.y - b.y;
      d = Math.sqrt(dx * dx + dy * dy);

      // calculate force for each axis based on distance
      if(d > 0 && d < 80) {
        F = g * (1 / d);
        fx += (F * dx);
        fy += (F * dy);
      }
    }

    // change particle velocity based on force
    a.vx = (a.vx + fx) * 0.5;
    a.vy = (a.vy + fy) * 0.5;

    // change particle position based on velocity
    a.x += a.vx;
    a.y += a.vy;

    // bounce back from the walls
    if((a.x <= 0 && a.x >= -100) || (a.x >= 500 && a.x <= 600)) { a.vx *= -1 };
    if((a.y <= 0 && a.y >= -100) || (a.y >= 500 && a.y <= 600)) { a.vy *= -1 };
  }
};


green = create(200, "yellow");
red = create(200, "red");
violet = create(200, "violet");

update = () => {
  // rule(green, green, -0.03);
  rule(green, green, 0.02);
  rule(green, red, -0.01);
  rule(red, green, 0.01);
  rule(red, violet, 0.01);
  rule(violet, green, 0.01);
  // rule(green, green, 1);
  // rule(green, green, -0.01);
  // rule(red, green, -0.02);
  // rule(red, violet, 0.01);
  rule(violet, red, -0.01);
  // rule(green, violet, 0.02);
  // rule(violet, green, -0.02);
  // rule(red, red, 0.1);
  // rule(violet, violet, 0.1);
  m.clearRect(0, 0, 500, 500);
  draw(0, 0, "black", 500);
  for(let i = 0; i < particles.length; ++i) {
    draw(particles[i].x, particles[i].y, particles[i].color, 5);
  }
  requestAnimationFrame(update);
};

update();