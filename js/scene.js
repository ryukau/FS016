//
// Globals
//
var width = window.innerWidth;
var height = window.innerHeight; // 全画面表示時にスクロールバーを表示させない

var scene;
var camera;
var rt1, rt2; // rt: render target
var uniforms1;
var renderer;

var stop = false;
var clock;
var clockSpeed = 1.0;

var R = 1, T = 3, C = 3, N = false; // CCA params

clock = new THREE.Clock();

init();
animate();

//
// three.js
//
function setupScreen()
{
    uniforms1 = { 
        time: { type: "f", value: 0.0 },
        resolution: { type: "v2", value: new THREE.Vector2() },
        tPrev: { type: "t", value: rt1 }
    };
              
    scene = new THREE.Scene();

    camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 1, 1000 );
    camera.position.z = 1;

    var geometry = new THREE.PlaneGeometry( 2, 2, 1 );
    
    // -----------
    // フィードバックエフェクト用にレンダーターゲットを2つ用意
    // rt1 と rt2
    rt1 = new THREE.WebGLRenderTarget( width, height, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );
    rt2 = new THREE.WebGLRenderTarget( width, height, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );
    // -----------
    
    var material = new THREE.ShaderMaterial(
        {
            uniforms: uniforms1,
            vertexShader: document.getElementById( 'vertexShader' ).textContent,
            fragmentShader: document.getElementById( 'fragmentShader' ).textContent
        });
    var mesh = (new THREE.Mesh( geometry, material ));
    
    scene.add( mesh );
}

function init()
{
    setupScreen();
    
    // 画面へのレンダラ
    renderer = new THREE.WebGLRenderer();
    //renderer.setClearColor(0xffffff, 1);
    renderer.setSize( width, height );
    //renderer.autoClear = false;

    // resolution を FS へ送る
    var canvas = renderer.domElement;
    uniforms1.resolution.value.x = canvas.width;
    uniforms1.resolution.value.y = canvas.height;
    
    document.body.appendChild( renderer.domElement );
}

function tick()
{
    uniforms1.time.value += clockSpeed * clock.getDelta();
}

function renderScreen()
{
    renderer.render( scene, camera );
    renderer.render( scene, camera, rt1, true );
    
    // feedback effect
    var temp = rt2;
    rt2 = rt1;
    rt1 = temp
    uniforms1.tPrev.value = rt2;
}

var count = 0;
function animate()
{
    if(!stop)
    {
        requestAnimationFrame( animate );
    }
    
    tick();
    renderScreen();
    
    //// 再生速度を下げる
    //if (count <= 0)
    //{
    //    tick();
    //    renderScreen();
    //}
    //
    //count = (count + 1) % 3;
}
