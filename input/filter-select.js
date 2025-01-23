import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class FilterSelect extends PolymerElement {
    static get properties() {
        return {
            data: {
                type: Array,
                value: () => [
                    { label: 'Alice', id: 'A-User' },
                    { label: 'Bob', id: 'B-User' },
                    { label: 'Charlie', id: 'Admin' },
                    { label: 'Daisy', id: 'Guest' },
                ],
            },
            filterText: {
                type: String,
                value: '',
            },
            filteredData: {
                type: Array,
                computed: 'computeFilteredData(data, filterText)',
            },
            categoryName: {
                type: String,
                value: '',
            }
        };
    }

    static get template() {
        return html`
      <style>
        .filter-container {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }
        .filter-container input,
        .filter-container select {
          padding: 8px;
          font-size: 1rem;
          width: 100%;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin: 5px 0;
        }

        /* Ensure select takes up full width */
        select {
            width: 100%;
            padding: 8px;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: white;
            appearance: none; /* Removes default arrow */
            -moz-appearance: none; /* For Firefox */
            -webkit-appearance: none; /* For Safari and Chrome */
            cursor: pointer;
        }

        /* Wrapper for positioning arrow */
        .select-wrapper {
            position: relative;
            width: 100%;
        }

        /* Custom arrow for dropdown */
        .select-wrapper:after {
            content: '▼';
            position: absolute;
            top: 50%;
            right: 12px;
            transform: translateY(-50%);
            pointer-events: none;
            font-size: 1rem;
            color: #666;
        }

        /* Force open dropdown appearance */
        select[size] {
            height: auto; /* Adjust for all items */
        }

        select[size]:focus {
            outline: none;
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        }

        /* Add hover effect to options */
        option:hover {
            background-color: #f0f0f0;
        }
      </style>

      <div class="filter-container">
        <!-- Text filter -->
        <input
          type="text"
          placeholder="Search by label"
          value="{{filterText::input}}"
        />
      </div>

      <!-- Filtered Data -->
      <div class="select-wrapper">
          <label>[[categoryName]]</label>
          <select size="2">
            <template is="dom-repeat" items="[[filteredData]]">
              <option key="[[item.id]]">[[item.label]]</option>
            </template>
          </select>
      </div>
      <div class="matches-list-wrapper">
          <template is="dom-if" if="[[filterText]]">
              <label>List of matches:</label>
              <ul>
                <template is="dom-repeat" items="[[filteredData]]">
                  <li>[[item.label]]</li>
                </template>
              </ul>
          </template>
      </div>
    `;
    }

    computeFilteredData(data, filterText) {
        if(!data) return [];
        return data.filter((item) => {
            const matchesText = item.label
                .toLowerCase()
                .includes(filterText.toLowerCase());

            return matchesText;
        });
    }
}

customElements.define('filter-select', FilterSelect);
