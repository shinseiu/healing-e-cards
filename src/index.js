document.addEventListener('DOMContentLoaded', function() {
	const images = document.querySelectorAll('.bouncing-image');
	const container = document.getElementById('container');
  
	images.forEach(image => {
	    // 设置随机初始位置
	    image.style.left = Math.random() * (container.offsetWidth - image.offsetWidth) + 'px';
	    image.style.top = Math.random() * (container.offsetHeight - image.offsetHeight) + 'px';
  
	    // 生成随机移动方向和速度，确保速度不为零
	    let dx = Math.random() * 4 - 2; // 水平方向速度
	    let dy = Math.random() * 4 - 2; // 垂直方向速度
  
	    // 确保dx和dy不为零
	    if (Math.abs(dx) < 1) {
		  dx = dx < 0 ? -1 : 1;
	    }
	    if (Math.abs(dy) < 1) {
		  dy = dy < 0 ? -1 : 1;
	    }
  
	    // 更新图片位置的函数
	    function updatePosition() {
		  let x = image.offsetLeft + dx;
		  let y = image.offsetTop + dy;
  
		  // 检测是否碰到容器边缘
		  if (x < 0 || x > container.offsetWidth - image.offsetWidth) {
			dx = -dx;
		  }
		  if (y < 0 || y > container.offsetHeight - image.offsetHeight) {
			dy = -dy;
		  }
  
		  // 更新图片位置
		  image.style.left = x + 'px';
		  image.style.top = y + 'px';
  
		  requestAnimationFrame(updatePosition);
	    }
  
	    // 开始运动
	    updatePosition();
	});
  });
  

import { initializeApp } from"firebase/app";
import { getFirestore, collection, addDoc, getDocs} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUXpZ4-OCdGeaWJrWo7ccaK12H-MUSEi8",
  authDomain: "post-48351.firebaseapp.com",
  projectId: "post-48351",
  storageBucket: "post-48351.appspot.com",
  messagingSenderId: "282583860237",
  appId: "1:282583860237:web:5746a510a3e57175d6c144"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
async function saveSentence(sentence) {
	try {
	    await addDoc(collection(db, "sentences"), { text: sentence });
	} catch (error) {
	    console.error("Error adding sentence: ", error);
	}
  }
  
  // 处理表单提交
  document.getElementById("sentenceForm").addEventListener("submit", async (event) => {
	event.preventDefault();
	const sentenceInput = document.getElementById("message");
	if (sentenceInput.value.trim() !== "") {
	    await saveSentence(sentenceInput.value.trim());
	    sentenceInput.value = ""; // 清空输入框
	}
  });
  

        // 函数：从 Firestore 获取数据并随机显示
	  async function showRandomSentence() {
		try {
		    const querySnapshot = await getDocs(collection(db, "sentences"));
		    const sentences = [];
		    querySnapshot.forEach((doc) => {
			  sentences.push(doc.data().text); // 假设字段名为 'sentence'
		    });
		    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
		    document.getElementById("randomContent").innerText = randomSentence;
		} catch (error) {
		    console.error("Error fetching sentences: ", error);
		    document.getElementById("randomContent").innerText = "Error loading sentence.";
		}
	  }
	window.showRandomSentence = showRandomSentence;
