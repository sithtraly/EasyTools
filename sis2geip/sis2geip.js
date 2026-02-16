const {
	createApp,
	ref
} = Vue

createApp({
	setup() {
		const files = ref([])
		const isDragOver = ref(false)
		const error = ref('')
		const step = ref(1)
		const wb = ref()
		const tabs = ref([])
		const activeTab = ref()
		const studentsForSort = ref({})
		const isLoading = ref(false)

		const dataSheets = ref({})

		const allowedTypes = [
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			"application/vnd.ms-excel"
		]

		const geipScoreHeaders = ["សរសេរតាមអាន", "តែងសេចក្តី", "ល្បឿនអំណាន", "ភាសាខ្មែរ", "គណិតវិទ្យា", "រូបវិទ្យា", "គីមីវិទ្យា", "ជីវវិទ្យា", "ប្រវត្តិវិទ្យា", "ព័ត៌មានវិទ្យា", "សីល-ពលរដ្ឋ", "ផែនដីវិទ្យា", "ភូមិវិទ្យា", "គេហវិទ្យា", "អប់រំកាយ", "ភាសាចិន/បំណិន", "សេដ្ឋកិច្ច", "សិល្បៈ", "កសិកម្ម", "ភាសាបរទេស",]
		const sisSubjectHeaders = ["សរសេរតាមអាន", "តែងសេចក្តី", "", "អក្សរសាស្រ្តខ្មែរ", "គណិតវិទ្យា", "រូបវិទ្យា", "គីមីវិទ្យា", "ជីវវិទ្យា", "ប្រវត្តិវិទ្យា", "បច្ចេកវិទ្យាគមនាគមន៍និងព័ត៏មាន", "សីលធម៌-ពលរដ្ឋវិជ្ជា", "ផែនដីវិទ្យា", "ភូមិវិទ្យា", "គេហវិទ្យា", "អប់រំកាយ-កីឡា", "បំណិនជីវិត", "សេដ្ឋកិច្ច", "អប់រំសុខភាព", "កសិកម្ម", "អង់គ្លេស",]

		const readExcel = async (file) => {
			const reader = new FileReader()

			reader.onload = async (event) => {
				const buffer = event.target.result
				wb.value = new ExcelJS.Workbook()
				await wb.value.xlsx.load(buffer)

				const wslength = wb.value.worksheets.length
				for (let i = 0; i < wslength; i++) {
					const ws = wb.value.worksheets[i]
					let rows = []
					rows[0] = ws.getRow(9).values.map(v => v ? v.replaceAll(' ', '') : v)
					ws.eachRow({ includeEmpty: true }, (row, i) => {
						if (i > 9 && !isNaN(row.values[1])) rows.push(row.values)
					})

					// remove unused column
					const removeUnusedColumn = (value) => {
						const i = rows[0].indexOf(value)
						if (i > -1) rows.map(row => row.splice(i, 1))
						if (rows[0].includes(value)) removeUnusedColumn(value)
					}
					removeUnusedColumn('ចំណាត់ថ្នាក់')
					removeUnusedColumn('និទ្ទេស')
					removeUnusedColumn('សរុប')
					removeUnusedColumn('មធ្យម')
					removeUnusedColumn('លទ្ធផល')
					removeUnusedColumn('ច្ប')
					removeUnusedColumn('អ.ច្ប')
					removeUnusedColumn('ផ្សេងៗ')
					removeUnusedColumn(null)

					sisSubjectHeaders.forEach((header, headerId) => {
						const rowHeaderId = rows[0].indexOf(header)
						if (rowHeaderId > -1) {
							const colId = headerId + 6
							if (header != rows[0][headerId + 6]) {
								rows = rows.map((row, rowId) => {
									const tmp = row[colId]
									row[colId] = row[rowHeaderId]
									row[rowHeaderId] = tmp
									return row
								})
							}
						}
					})

					// fill none score with 0
					rows = rows.map((row, i) => {
						row.shift()
						row = [...row]
						if (i <= 0) {
							const fillUndefineItem = () => {
								if (row.includes(undefined)) {
									const i = row.lastIndexOf(undefined)
									row[i] = sisSubjectHeaders[i - 5] || geipScoreHeaders[i - 5]
									fillUndefineItem()
								}
							}
							fillUndefineItem()
						}
						else {
							row = row.map((v, i) => v = [null, undefined, '', 'A'].includes(v) && i > 0 ? 0 : v)
						}
						return row
					})

					// const newWs = wb.addWorksheet(`New ${ws.name}`)
					// newWs.insertRows(1, rows)
					dataSheets.value[ws.name] = rows
				}
			}

			reader.readAsArrayBuffer(file)
		}

		const sortByProvidedName = () => {
			for (const col of tabs.value) {
				const [header, ...data] = dataSheets.value[col]
				const originOrder = studentsForSort.value[col]

				if (originOrder) {
					const orderMap = new Map()
					originOrder.split('\n').forEach((name, index) => orderMap.set(name, index))
					data.sort((a, b) => {
						const ia = orderMap.has(a[2]) ? orderMap.get(a[2]) : Infinity
						const ib = orderMap.has(b[2]) ? orderMap.get(b[2]) : Infinity
						return ia - ib
					})
				}

				const ws = wb.value.addWorksheet(`prepared-${col}`)
				ws.insertRows(1, [header, ...data])
			}
		}

		const downLoadFile = async () => {
			isLoading.value = true
			setTimeout(async () => {
				sortByProvidedName()
				// Download file
				const buffer = await wb.value.xlsx.writeBuffer()
				const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
				const link = document.createElement('a')
				link.download = `Prepared-${files.value[0].name}`
				link.href = URL.createObjectURL(blob)
				link.click()
				URL.revokeObjectURL(link.href)
				step.value = 1
				isLoading.value = false
				files.value = []
			}, 2)
		}

		const validateFile = (file) => {
			if (!allowedTypes.includes(file.type)) {
				error.value = 'Only Excel files (.xlsx, .xlsn, .xlsb, .xls) are allowed.'
				return false
			}
			error.value = ''
			return true
		}

		const handleDrop = async (event) => {
			event.preventDefault()
			isDragOver.value = false
			const _files = [...event.dataTransfer.files]
			const validated = validateFile(_files[0])
			files.value = validated ? _files : []
			wb.value = await readExcel(_files[0])
		}

		const handleDragOver = (event) => {
			event.preventDefault()
			isDragOver.value = true
		}

		const handleDragLeave = (event) => {
			isDragOver.value = false
		}

		const hanldeFileSelect = async (event) => {
			files.value = [...event.target.files]
			wb.value = await readExcel(files.value[0])
		}

		const next = async () => {
			step.value++
			tabs.value = Object.keys(dataSheets.value)
			activeTab.value = tabs.value[0]
		}

		return {
			files,
			isDragOver,
			error,
			step,
			dataSheets,
			tabs,
			activeTab,
			studentsForSort,
			isLoading,
			handleDrop,
			handleDragOver,
			handleDragLeave,
			hanldeFileSelect,
			validateFile,
			next,
			downLoadFile,
		}
	},

	template: `
		<div  v-if="step == 1">
			<h2>បញ្ចូលឯកសារ</h2>

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

				<p>ទាញ ឬចុចដើម្បីបញ្ចូល</p>
				<p>ឯកសារដែលអាចប្រើបាន: .xlsx, .xlsn, .xlsb, .xls</p>
			</label>

			<div class="file-list" v-if="files.length">
				<h4>Selected Files:</h4>
				<ul>
					<li v-for="file in files" :key="file.name">
						{{ file.name }} ({{ Math.round(file.size / 1024) }} KB)
					</li>
				</ul>
			</div>

			<div class="error" v-if="error">\
				<h4>ឯកសារមិនគាំទ្រ</h4>
				<p>{{error}}</p>
			</div>
			<button @click="next()" v-if="files.length" class="bt-primary float-right">បន្ទាប់ &rArr;</button>
		</div>

		<div v-if="step == 2">
			<p>បញ្ចូលឈ្មោះដែលត្រូវតម្រៀបតាម</p>
			<div class="tabs">
				<button v-for="tab in tabs" class="tab" :class="{'tab-active': tab == activeTab}" @click="activeTab = tab">{{tab}}</button>
				<textarea v-for="tab in tabs" :id="tab" v-model="studentsForSort[tab]" :key="tab" style="width: 100%" rows="20" v-show="tab == activeTab">{{studentsForSort[tab]}}</textarea>
				<button @click="downLoadFile()" class="bt-primary float-right" :disabled="isLoading">
					<span v-if="!isLoading">ទាញយក &darr;</span>
					<div style="display: flex;align-items: center;" v-if="isLoading" >
						<span margin-right: 10px>Downloading</span>
						<div class="loader"></div>
					</div>
				</button>
			</div>
		</div>
	`
}).mount('#app')