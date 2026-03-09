let e=document.querySelector.bind(document);e("button#bt-start").addEventListener("click",()=>e("#dialog").showModal()),e("#dialog").addEventListener("click",a=>{let l=dialog.getBoundingClientRect();l.top<=a.clientY&&a.clientY<=l.top+l.height&&l.left<=a.clientX&&a.clientX<=l.left+l.width||e("#dialog").close()});let{createApp:a,ref:l}=Vue;a({setup(){let a=l([]),t=l(!1),u=l(""),i=l(1),s=l(),n=l([]),r=l(),o=l({}),d=l(!1),v=l({}),c=["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.ms-excel"],p=["សរសេរតាមអាន","តែងសេចក្តី","ល្បឿនអំណាន","ភាសាខ្មែរ","គណិតវិទ្យា","រូបវិទ្យា","គីមីវិទ្យា","ជីវវិទ្យា","ប្រវត្តិវិទ្យា","ព័ត៌មានវិទ្យា","សីល-ពលរដ្ឋ","ផែនដីវិទ្យា","ភូមិវិទ្យា","គេហវិទ្យា","អប់រំកាយ","ភាសាចិន/បំណិន","សេដ្ឋកិច្ច","សិល្បៈ","កសិកម្ម","ភាសាបរទេស"],f=["សរសេរតាមអាន","តែងសេចក្តី","","អក្សរសាស្រ្តខ្មែរ","គណិតវិទ្យា","រូបវិទ្យា","គីមីវិទ្យា","ជីវវិទ្យា","ប្រវត្តិវិទ្យា","បច្ចេកវិទ្យាគមនាគមន៍និងព័ត៏មាន","សីលធម៌-ពលរដ្ឋវិជ្ជា","ផែនដីវិទ្យា","ភូមិវិទ្យា","គេហវិទ្យា","អប់រំកាយ-កីឡា","បំណិនជីវិត","សេដ្ឋកិច្ច","អប់រំសុខភាព","កសិកម្ម","អង់គ្លេស"],h=async e=>{let a=new FileReader;a.onload=async e=>{let a=e.target.result;s.value=new ExcelJS.Workbook,await s.value.xlsx.load(a);let l=s.value.worksheets.length;for(let e=0;e<l;e++){let a=s.value.worksheets[e],l=[];l[0]=a.getRow(9).values.map(e=>e?e.replaceAll(" ",""):e),a.eachRow({includeEmpty:!0},(e,a)=>{a>9&&!isNaN(e.values[1])&&l.push(e.values)});let t=e=>{let a=l[0].indexOf(e);a>-1&&l.map(e=>e.splice(a,1)),l[0].includes(e)&&t(e)};t("ចំណាត់ថ្នាក់"),t("និទ្ទេស"),t("សរុប"),t("មធ្យម"),t("លទ្ធផល"),t("ច្ប"),t("អ.ច្ប"),t("ផ្សេងៗ"),t(null),f.forEach((e,a)=>{let t=l[0].indexOf(e);if(t>-1){let u=a+6;e!=l[0][a+6]&&(l=l.map((e,a)=>{let l=e[u];return e[u]=e[t],e[t]=l,e}))}}),l=l.map((e,a)=>{if(e.shift(),e=[...e],a<=0){let a=()=>{if(e.includes(void 0)){let l=e.lastIndexOf(void 0);e[l]=f[l-5]||p[l-5],a()}};a()}else e=e.map((e,a)=>e=[null,void 0,"","A"].includes(e)&&a>0?0:e);return e}),v.value[a.name]=l}},a.readAsArrayBuffer(e)},b=async()=>{d.value=!0,setTimeout(async()=>{for(let e of n.value){let[a,...l]=v.value[e],t=o.value[e];if(t){let e=new Map;t.split("\n").forEach((a,l)=>e.set(a,l)),l.sort((a,l)=>(e.has(a[2])?e.get(a[2]):1/0)-(e.has(l[2])?e.get(l[2]):1/0))}s.value.addWorksheet(`prepared-${e}`).insertRows(1,[a,...l])}let l=new Blob([await s.value.xlsx.writeBuffer()],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),t=document.createElement("a");t.download=`Prepared-${a.value[0].name}`,t.href=URL.createObjectURL(l),t.click(),URL.revokeObjectURL(t.href),i.value=1,d.value=!1,a.value=[],o.value={},n.value=[],e("#dialog").close()})},x=e=>c.includes(e.type)?(u.value="",!0):(u.value="Only Excel files (.xlsx, .xlsn, .xlsb, .xls) are allowed.",!1),g=async e=>{e.preventDefault(),t.value=!1;let l=[...e.dataTransfer.files];a.value=x(l[0])?l:[],s.value=await h(l[0])},m=async e=>{a.value=[...e.target.files],s.value=await h(a.value[0])},B=async e=>{e.stopPropagation(),i.value++,n.value=Object.keys(v.value),r.value=n.value[0]};return{files:a,isDragOver:t,error:u,step:i,dataSheets:v,tabs:n,activeTab:r,studentsForSort:o,isLoading:d,handleDrop:g,handleDragOver:e=>{e.preventDefault(),t.value=!0},handleDragLeave:e=>{t.value=!1},hanldeFileSelect:m,validateFile:x,next:B,downLoadFile:b}},template:`
		<div  v-if="step == 1">
			<h2>\u{1794}\u{1789}\u{17D2}\u{1785}\u{17BC}\u{179B}\u{17AF}\u{1780}\u{179F}\u{17B6}\u{179A}</h2>

			<label
				class="drop-zone"
				:class="{ dragover: isDragOver }"
				@drop="handleDrop"
				@dragover="handleDragOver"
				@dragleave="handleDragLeave"
			>
				<input
					type="file"
					multiple
					hidden
					@change="hanldeFileSelect"
					accept=".xlsx, .xlsn, .xlsb, .xls, .xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				/>

				<p class="text-center">\u{1791}\u{17B6}\u{1789} \u{17AC}\u{1785}\u{17BB}\u{1785}\u{178A}\u{17BE}\u{1798}\u{17D2}\u{1794}\u{17B8}\u{1794}\u{1789}\u{17D2}\u{1785}\u{17BC}\u{179B}</p>
				<p class="text-center">\u{17AF}\u{1780}\u{179F}\u{17B6}\u{179A}\u{178A}\u{17C2}\u{179B}\u{17A2}\u{17B6}\u{1785}\u{1794}\u{17D2}\u{179A}\u{17BE}\u{1794}\u{17B6}\u{1793}: .xlsx, .xlsn, .xlsb, .xls</p>
			</label>

			<div class="file-list" v-if="files.length">
				<h2>Selected Files:</h2>
				<ul>
					<li v-for="file in files" :key="file.name">
						{{ file.name }} ({{ Math.round(file.size / 1024) }} KB)
					</li>
				</ul>
			</div>

			<div class="error" v-if="error">\
				<h4>\u{17AF}\u{1780}\u{179F}\u{17B6}\u{179A}\u{1798}\u{17B7}\u{1793}\u{1782}\u{17B6}\u{17C6}\u{1791}\u{17D2}\u{179A}</h4>
				<p>{{error}}</p>
			</div>
			<button type="button" @click="next" v-if="files.length" class="bt-primary float-right">\u{1794}\u{1793}\u{17D2}\u{1791}\u{17B6}\u{1794}\u{17CB} &rArr;</button>
		</div>

		<div v-if="step == 2">
			<h2>\u{1794}\u{1789}\u{17D2}\u{1785}\u{17BC}\u{179B}\u{1788}\u{17D2}\u{1798}\u{17C4}\u{17C7}\u{178A}\u{17C2}\u{179B}\u{178F}\u{17D2}\u{179A}\u{17BC}\u{179C}\u{178F}\u{1798}\u{17D2}\u{179A}\u{17C0}\u{1794}\u{178F}\u{17B6}\u{1798}</h2>
			<div class="tabs">
				<button type="button" v-for="(tab, i) in tabs" class="tab" :class="{'tab-active': tab == activeTab,'last': i == tabs.length - 1}" @click="activeTab = tab">{{tab}}</button>
				<textarea v-for="tab in tabs" :id="tab" v-model="studentsForSort[tab]" :key="tab" style="width: 100%;border-top-left-radius: 0;" rows="20" v-show="tab == activeTab">{{studentsForSort[tab]}}</textarea>
				<button type="button" @click="downLoadFile()" class="bt-primary float-right" :disabled="isLoading">
					<span v-if="!isLoading">\u{1791}\u{17B6}\u{1789}\u{1799}\u{1780} &darr;</span>
					<div style="display: flex;align-items: center;" v-if="isLoading" >
						<span margin-right: 10px>Downloading</span>
						<div class="loader"></div>
					</div>
				</button>
			</div>
		</div>
	`}).mount("#app");
//# sourceMappingURL=sis2geip.8253639a.js.map
