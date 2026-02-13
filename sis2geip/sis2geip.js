const {
	createApp,
	ref
} = Vue

createApp({
	setup() {
		const files = ref([])
		const isDragOver = ref(false)
		const data = ref([])
		const error = ref('')

		const allowedTypes = [
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			"application/vnd.ms-excel"
		]

		// const geipScoreHeaders = [
		// 	{ no: 1, subject: "សរសេរតាមអាន", },
		// 	{ no: 2, subject: "តែងសេចក្តី", },
		// 	{ no: 3, subject: "ល្បឿនអំណាន", },
		// 	{ no: 4, subject: "ភាសាខ្មែរ", },
		// 	{ no: 5, subject: "គណិតវិទ្យា", },
		// 	{ no: 6, subject: "រូបវិទ្យា", },
		// 	{ no: 7, subject: "គីមីវិទ្យា", },
		// 	{ no: 8, subject: "ជីវវិទ្យា", },
		// 	{ no: 9, subject: "ប្រវត្តិវិទ្យា", },
		// 	{ no: 10, subject: "ព័ត៌មានវិទ្យា", },
		// 	{ no: 11, subject: "សីល-ពលរដ្ឋ", },
		// 	{ no: 12, subject: "ផែនដីវិទ្យា", },
		// 	{ no: 13, subject: "ភូមិវិទ្យា", },
		// 	{ no: 14, subject: "គេហវិទ្យា", },
		// 	{ no: 15, subject: "អប់រំកាយ", },
		// 	{ no: 16, subject: "ភាសាចិន/បំណិន", },
		// 	{ no: 17, subject: "សេដ្ឋកិច្ច", },
		// 	{ no: 18, subject: "សិល្បៈ", },
		// 	{ no: 19, subject: "កសិកម្ម", },
		// 	{ no: 20, subject: "ភាសាបរទេស", },
		// ]

		// const sisSubjectHeaders = [
		// 	{ no: 1, subject: "សរសេរតាមអាន", },
		// 	{ no: 2, subject: "តែងសេចក្តី", },
		// 	{ no: 3, subject: "", },
		// 	{ no: 4, subject: "អក្សរសាស្រ្តខ្មែរ", },
		// 	{ no: 5, subject: "គណិតវិទ្យា", },
		// 	{ no: 6, subject: "រូបវិទ្យា", },
		// 	{ no: 7, subject: "គីមីវិទ្យា", },
		// 	{ no: 8, subject: "ជីវវិទ្យា", },
		// 	{ no: 9, subject: "ប្រវត្តិវិទ្យា", },
		// 	{ no: 10, subject: "បច្ចេកវិទ្យាគមនាគមន៍និងព័ត៏មាន", },
		// 	{ no: 11, subject: "សីលធម៌-ពលរដ្ឋវិជ្ជា", },
		// 	{ no: 12, subject: "ផែនដីវិទ្យា", },
		// 	{ no: 13, subject: "ភូមិវិទ្យា", },
		// 	{ no: 14, subject: "គេហវិទ្យា", },
		// 	{ no: 15, subject: "អប់រំកាយ-កីឡា", },
		// 	{ no: 16, subject: "បំណិនជីវិត", },
		// 	{ no: 17, subject: "សេដ្ឋកិច្ច", },
		// 	{ no: 18, subject: "អប់រំសុខភាព", },
		// 	{ no: 19, subject: "កសិកម្ម", },
		// 	{ no: 20, subject: "អង់គ្លេស", },
		// ]

		// const subjectHeaders = [
		// 	{ no: 1, sis: "សរសេរតាមអាន", geip: "សរសេរតាមអាន", },
		// 	{ no: 2, sis: "តែងសេចក្តី", geip: "តែងសេចក្តី", },
		// 	{ no: 3, sis: "", geip: "ល្បឿនអំណាន", },
		// 	{ no: 4, sis: "អក្សរសាស្រ្តខ្មែរ", geip: "ភាសាខ្មែរ", },
		// 	{ no: 5, sis: "គណិតវិទ្យា", geip: "គណិតវិទ្យា", },
		// 	{ no: 6, sis: "រូបវិទ្យា", geip: "រូបវិទ្យា", },
		// 	{ no: 7, sis: "គីមីវិទ្យា", geip: "គីមីវិទ្យា", },
		// 	{ no: 8, sis: "ជីវវិទ្យា", geip: "ជីវវិទ្យា", },
		// 	{ no: 9, sis: "ប្រវត្តិវិទ្យា", geip: "ប្រវត្តិវិទ្យា", },
		// 	{ no: 10, sis: "បច្ចេកវិទ្យាគមនាគមន៍និងព័ត៏មាន", geip: "ព័ត៌មានវិទ្យា", },
		// 	{ no: 11, sis: "សីលធម៌-ពលរដ្ឋវិជ្ជា", geip: "សីល-ពលរដ្ឋ", },
		// 	{ no: 12, sis: "ផែនដីវិទ្យា", geip: "ផែនដីវិទ្យា", },
		// 	{ no: 13, sis: "ភូមិវិទ្យា", geip: "ភូមិវិទ្យា", },
		// 	{ no: 14, sis: "គេហវិទ្យា", geip: "គេហវិទ្យា", },
		// 	{ no: 15, sis: "អប់រំកាយ-កីឡា", geip: "អប់រំកាយ", },
		// 	{ no: 16, sis: "បំណិនជីវិត", geip: "ភាសាចិន/បំណិន", },
		// 	{ no: 17, sis: "សេដ្ឋកិច្ច", geip: "សេដ្ឋកិច្ច", },
		// 	{ no: 18, sis: "អប់រំសុខភាព", geip: "សិល្បៈ", },
		// 	{ no: 19, sis: "កសិកម្ម", geip: "កសិកម្ម", },
		// 	{ no: 20, sis: "អង់គ្លេស", geip: "ភាសាបរទេស", },
		// ]

		const geipScoreHeaders = ["សរសេរតាមអាន", "តែងសេចក្តី", "ល្បឿនអំណាន", "ភាសាខ្មែរ", "គណិតវិទ្យា", "រូបវិទ្យា", "គីមីវិទ្យា", "ជីវវិទ្យា", "ប្រវត្តិវិទ្យា", "ព័ត៌មានវិទ្យា", "សីល-ពលរដ្ឋ", "ផែនដីវិទ្យា", "ភូមិវិទ្យា", "គេហវិទ្យា", "អប់រំកាយ", "ភាសាចិន/បំណិន", "សេដ្ឋកិច្ច", "សិល្បៈ", "កសិកម្ម", "ភាសាបរទេស",]
		const sisSubjectHeaders = ["សរសេរតាមអាន", "តែងសេចក្តី", "", "អក្សរសាស្រ្តខ្មែរ", "គណិតវិទ្យា", "រូបវិទ្យា", "គីមីវិទ្យា", "ជីវវិទ្យា", "ប្រវត្តិវិទ្យា", "បច្ចេកវិទ្យាគមនាគមន៍និងព័ត៏មាន", "សីលធម៌-ពលរដ្ឋវិជ្ជា", "ផែនដីវិទ្យា", "ភូមិវិទ្យា", "គេហវិទ្យា", "អប់រំកាយ-កីឡា", "បំណិនជីវិត", "សេដ្ឋកិច្ច", "អប់រំសុខភាព", "កសិកម្ម", "អង់គ្លេស",]

		const readExcel = async (file) => {
			const reader = new FileReader()

			reader.onload = async (event) => {
				let buffer = event.target.result
				const wb = new ExcelJS.Workbook()
				await wb.xlsx.load(buffer)

				const wslength = wb.worksheets.length
				const ws = wb.worksheets[0]
				let rows = []
				rows[0] = ws.getRow(9).values.map(v => v ? v.replaceAll(' ', '') : v)
				ws.eachRow({ includeEmpty: true }, (row, i) => {
					if (i > 9 && !isNaN(row.values[1])) rows.push(row.values)
				})
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

				const newWs = wb.addWorksheet(`New ${ws.name}`)
				newWs.insertRows(1, rows)

				// Download file
				buffer = await wb.xlsx.writeBuffer()
				const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
				const link = document.createElement('a')
				link.download = `Prepared-${file.name}`
				link.href = URL.createObjectURL(blob)
				link.click()
				URL.revokeObjectURL(link.href)
			}

			reader.readAsArrayBuffer(file)
		}

		const validateFile = (file) => {
			if (!allowedTypes.includes(file.type)) {
				error.value = 'Only Excel files (.xlsx, .xlsn, .xlsb, .xls) are allowed.'
				return false
			}
			error.value = ''
			return true
		}

		const handleDrop = (event) => {
			event.preventDefault()
			isDragOver.value = false
			const _files = [...event.dataTransfer.files]
			const validated = validateFile(_files[0])
			readExcel(_files[0])
			files.value = validated ? _files : []
		}

		const handleDragOver = (event) => {
			event.preventDefault()
			isDragOver.value = true
		}

		const handleDragLeave = (event) => {
			isDragOver.value = false
		}

		const hanldeFileSelect = (event) => {
			files.value = [...event.target.files]
			readExcel(files.value[0])
		}

		return {
			files,
			isDragOver,
			error,
			handleDrop,
			handleDragOver,
			handleDragLeave,
			hanldeFileSelect,
			validateFile,
		}
	},

	template: `
		<div>
			<h2>Drag & Drop File Upload</h2>

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

				<p>Drag files here or click to upload</p>
				<p>Support file extensions: .xlsx, .xlsn, .xlsb, .xls</p>
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
				<h4>Unsuported file type</h4>
				<p>{{error}}</p>
			</div>
		</div>
	`
}).mount('#app')